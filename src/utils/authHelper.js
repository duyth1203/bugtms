import localStorageHelper from "./localStorageHelper";
import jwt_decode from "jwt-decode";

const authHelper = {
  checkAuth: () => {
    const accessToken = localStorageHelper.getItemLocalStorage("access_token");
    if (!accessToken) return false;

    const { exp } = jwt_decode(accessToken);
    if (!exp) return false;

    return Date.now() <= exp * 1000;
  },

  login: (accessToken, refreshToken, user, cb) => {
    accessToken &&
      localStorageHelper.setItemLocalStorage("access_token", accessToken);
    refreshToken &&
      localStorageHelper.setItemLocalStorage("refresh_token", accessToken);
    user && localStorageHelper.setItemLocalStorage("user", user);
    cb && cb();
  },

  logout: cb => {
    localStorageHelper.removeItemLocalStorage("access_token");
    localStorageHelper.removeItemLocalStorage("refresh_token");
    cb && cb();
  },

  getAccessToken: () => localStorageHelper.getItemLocalStorage("access_token"),

  getRefreshToken: () => localStorageHelper.getItemLocalStorage("refresh_token")
};

export default authHelper;
