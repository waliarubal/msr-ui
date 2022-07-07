function getToken() {
  return sessionStorage.getItem("authToken");
}

module.exports = {
  getToken
};
