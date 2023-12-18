import { USER_AUTH_INFO_KEY } from "../../../constant";
import { localStorageService } from "../../common";
import { userClient } from "../http";
import axios from "axios";
export const login = async (loginForm) => {
  return await userClient.post(
    "http://localhost:8080/auth/loginCustomer",
    loginForm
  );
};

export const signUp = async (signUpForm) => {
  return await userClient.post(
    "http://localhost:8080/auth/signUpCustomer",
    signUpForm
  );
};
export const checkEmailAvailability = async (email) => {
  return await axios.post(
    "http://localhost:8080/customer/checkEmail",
    { email } // Send email as JSON data
  );
};

export const checkPhoneAvailability = async (phone) => {
  return await axios.post(
    "http://localhost:8080/customer/checkPhone",
    { phone } // Send phone as JSON data
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
