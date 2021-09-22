const TOKEN_NAME = "token";

const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
};

const getAuthToken = () => {
  return localStorage.getItem(TOKEN_NAME);
}

const scrollTop = () => {
  window.document.body.scrollTop = 0;
  window.document.documentElement.scrollTop = 0;
}

export { setAuthToken, getAuthToken, scrollTop };