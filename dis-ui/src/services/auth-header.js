export default function authHeader() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (user && user.accessToken) {
    return { Authorization: "Bearer " + user.accessToken }; // for Spring Boot back-end
  } else {
    return console.log("No token!");
  }
}
