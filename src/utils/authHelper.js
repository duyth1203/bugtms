import jwt_decode from "jwt-decode";
import { getCookie, setCookie, removeCookie } from "tiny-cookie";

const authHelper = {
  checkAuth: () => {
    const accessToken = getCookie("access_token");
    if (!accessToken) return false;
    const { exp } = jwt_decode(accessToken);
    if (!exp) return false;
    if (Date.now() <= exp * 1000) return true;
    // session expired
    removeCookie("access_token");
    removeCookie("refresh_token");
    removeCookie("user");
    removeCookie("defaultProjectId");
    return false;
  },

  login: (accessToken, refreshToken, user, cb) => {
    const { exp } = jwt_decode(accessToken);
    if (!exp) return false;
    const expires = new Date(exp * 1000);
    accessToken && setCookie("access_token", accessToken, { expires });
    refreshToken && setCookie("refresh_token", refreshToken, { expires });
    user && setCookie("user", JSON.stringify(user), { expires });
    setCookie("defaultProjectId", -1, { expires });
    cb && cb();
  },

  logout: cb => {
    removeCookie("access_token");
    removeCookie("refresh_token");
    removeCookie("user");
    removeCookie("defaultProjectId");
    cb && cb();
  }
};

export default authHelper;
