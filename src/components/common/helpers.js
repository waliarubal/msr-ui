function getToken() {
  return sessionStorage.getItem("authToken");
}

function getUserId() {
  let user = sessionStorage.getItem("user");
  if (!user) return "";
  return JSON.parse(user)._id;
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
};
