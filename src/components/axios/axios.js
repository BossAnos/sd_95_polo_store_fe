import axios from "axios";
import i18n from "../../i18n";
import { API_ENDPOINT } from "../../utils/const";
import {
  persistAccessToken,
  readAccessToken,
  readRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  removeUserInfo,
} from "../../utils/localStorage";
import { toastError } from "../../utils/toast";
// import dayjs from "dayjs";
// import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
// dayjs.extend(isSameOrBefore);
const API_URL = process.env.REACT_APP_BACKEND_URL;

const axiosOptions = {
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  // withCredentials: true, // cookie
};

const baseAxios = axios.create(axiosOptions);

baseAxios.interceptors.request.use(async (config) => {
  // config.timeout = 10000;
  const accessToken = readAccessToken();
  if (
    accessToken &&
    // && dayjs().isSameOrBefore(dayjs.unix(accessToken.expiresAt))
    !config.url.includes("auth")
  ) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return config;
});

export const refreshAxios = axios.create(axiosOptions);

baseAxios.interceptors.response.use(
  (response) => {
    if (![200, 422].includes(response.data.status)) {
      return Promise.reject(response);
    }
    return response;
  },
  (err) => {
    if (err.response) {
      if (err.response.status === 401) {
        const token = readRefreshToken();
        return refreshAxios
          .post(API_ENDPOINT.AUTH.REFRESH, null, {
            params: {
              refreshToken: token,
            },
          })
          .then((reply) => {
            const accessToken = reply.data.data;
            // const { accessToken, refreshToken, ...user } =
            //   reply.data.data || {};
            // persistUserInfo(user);
            persistAccessToken(accessToken);
            return baseAxios(err.config);
          })
          .catch((error) => {
            removeAccessToken();
            removeRefreshToken();
            removeUserInfo();
            window.location.href = "/login";
            return Promise.reject(error);
          });
      } else if (err.response.status === 403) {
        removeAccessToken();
        removeRefreshToken();
        removeUserInfo();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    } else if (err.message === "Network Error") {
      toastError(i18n.t("No network connection, please try again!"), {
        toastId: "NetworkError",
      });
    } else {
      toastError("Internal server error", {
        toastId: "InternalServerError",
      });
    }
    return Promise.reject(err);
  }
);

export default baseAxios;
