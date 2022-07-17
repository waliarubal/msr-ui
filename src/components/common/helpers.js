function getToken() {
  return sessionStorage.getItem("authToken");
}

function getUserId() {
  let user = sessionStorage.getItem("user");
  if (!user) return "";
  return JSON.parse(user)._id;
}

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
}

module.exports = {
  getToken,
  getUserId,
  formatDate,
};
