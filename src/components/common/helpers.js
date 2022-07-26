function getToken() {
  return sessionStorage.getItem("authToken");
}

function getUserId() {
  let user = sessionStorage.getItem("user");
  if (!user) return "";
  return JSON.parse(user)._id;
}

function getUserAlias() {
  let user = sessionStorage.getItem("user");
  if (!user) return "";
  let email = JSON.parse(user).username;
  if (!email) return "";

  return email.substring(0, email.lastIndexOf("@"));
}

function isAdmin() {
  return sessionStorage.getItem("role") !== "User";
}

function formatDateTime(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
}

module.exports = {
  getToken,
  getUserId,
  formatDate,
  formatDateTime,
  isAdmin,
  getUserAlias
};
