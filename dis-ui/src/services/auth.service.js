import axios from "axios";
import authHeader from "./auth-header";
import { LINK } from "./LINK";

const API_URL = LINK + "/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          sessionStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    axios.get(API_URL + "logout", { headers: authHeader() });
    sessionStorage.removeItem("user");
  }

  register(username, password) {
    return axios.post(API_URL + "signup", {
      username,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem("user"));
  }

  getUserById(id) {
    return axios.get(API_URL + id);
  }
}

export default new AuthService();
