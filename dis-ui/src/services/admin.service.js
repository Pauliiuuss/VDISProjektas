import axios from "axios";
import authHeader from "./auth-header";

// const API_URL = process.env.PUBLIC_URL + "/api/admin/";
const API_URL = "http://localhost:8080/api/admin/";

class AdminService {
  createUser(body) {
    return axios.post(API_URL + "create", body, { headers: authHeader() });
  }

  getUsers() {
    return axios.post(API_URL + "getusers", { headers: authHeader() });
  }
}

export default new AdminService();
