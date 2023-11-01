import { ADMIN_AUTH_INFO_KEY } from "../../../constant";
import { localStorageService } from "../../common";
import { adminClient } from "../http";

class AuthService {
  async login(loginForm) {
    return await adminClient.post(
      "http://localhost:8080/auth/login",
      loginForm
    );
  }

  async register(registerForm) {
    return await adminClient.post(
      "http://localhost:8080/auth/registry",
      registerForm
    );
  }

  saveAuthInfo(authInfo) {
    localStorageService.setItem(ADMIN_AUTH_INFO_KEY, authInfo);
  }

  getAuthInfo() {
    return localStorageService.getItem(ADMIN_AUTH_INFO_KEY);
  }

  isLogin() {
    return this.getAuthInfo();
  }

  logout() {
    localStorageService.remove(ADMIN_AUTH_INFO_KEY);
  }

  getAccessToken() {
    return "your-fixed-token";
  }
}

let authService = new AuthService();
export default authService;
