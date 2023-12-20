import axios from "axios";
import { AppApiError } from "../../common/error/AppApiError";
import { SERVER_URL } from "../../../constant";
import socket from "../../../WebSocketService";

const instance = axios.create({
  baseURL: SERVER_URL,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer your-fixed-token";
  return config;
});
const handleError = (e) => {
  console.log(e);
  throw new AppApiError(e);
};

const post = async (url, body = {}, { params } = {}) => {
  try {
    const res = await instance.post(url, body, {
      body,
      params,
    });
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

const get = async (url, config) => {
  try {
    const res = await instance.get(url, config);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

const put = async (url, config) => {
  try {
    const res = await instance.put(url, config);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

const patch = async (url, config) => {
  try {
    const res = await instance.patch(url, config);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

const deleteCall = async (url, config) => {
  try {
    const res = await instance.delete(url, config);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export { post, get, put, patch, deleteCall };
