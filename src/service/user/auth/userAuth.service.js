import { USER_AUTH_INFO_KEY } from "../../../constant";
import { localStorageService } from "../../common";
import { userClient } from "../http";

export const login = async (loginForm) => {
  return await userClient.post(
    "http://localhost:8080/auth/loginCustomer",
    loginForm
  );
};

export const saveAuthInfo = (authInfo) => {
  localStorageService.setItem(USER_AUTH_INFO_KEY, authInfo);
};

export const getAuthInfo = () => {
  return localStorageService.getItem(USER_AUTH_INFO_KEY);
};

export const isLogin = () => {
  return !!getAuthInfo();
};

export const logout = () => {
  localStorageService.remove(USER_AUTH_INFO_KEY);
};
