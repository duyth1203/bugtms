const setAuthLocalStorage = val => {
  if (localStorage && localStorage.getItem("authenticated"))
    localStorage.removeItem("authenticated");
  localStorage.setItem("authenticated", val);
};

class AuthHelper {
  checkAuth = () => localStorage && localStorage.getItem("authenticated");

  login = cb => {
    setAuthLocalStorage(true);
    cb && cb();
  };

  logout = cb => {
    setAuthLocalStorage(false);
    cb && cb();
  };
}

export default AuthHelper;
