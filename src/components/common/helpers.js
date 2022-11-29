function getToken() {
  return sessionStorage.getItem("authToken");
}

function getUserId() {
  let user = sessionStorage.getItem("user");
  if (!user) return "";
  return JSON.parse(user)._id;
}

function getUserEmail() {
  let user = sessionStorage.getItem("user");
  if (!user) return "";
  let email = JSON.parse(user).username;
  if (!email) return "";

  return email;
}

function getUserAlias() {
  let user = sessionStorage.getItem("user");
  if (!user) return "";
  let email = JSON.parse(user).username;
  if (!email) return "";

  return email.substring(0, email.lastIndexOf("@"));
}

function getAliasFromEmail(email) {
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

function getPstTimeString() {
  const date = new Date();

  const pst = date.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return pst;
}

module.exports = {
  getToken,
  getUserId,
  formatDate,
  formatDateTime,
  isAdmin,
  getUserAlias,
  getAliasFromEmail,
  getUserEmail,
  getPstTimeString,
};
