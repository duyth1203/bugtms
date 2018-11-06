const localStorageHelper = {
  setItemLocalStorage: (key, value) => {
    if (!key || !value) return;
    if (localStorage && localStorage.getItem(key)) localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(value));
  },

  getItemLocalStorage: key =>
    key &&
    localStorage &&
    localStorage.getItem(key) &&
    JSON.parse(localStorage.getItem(key)),

  removeItemLocalStorage: key => key && localStorage && localStorage.remove(key)
};

export default localStorageHelper;
