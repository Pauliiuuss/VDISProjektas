import axios from "axios";
import authHeader from "./auth-header";
import { LINK } from "./LINK";

const API_URL = LINK + "/api/admin/";

class AdminService {
  createUser(body) {
    return axios.post(API_URL + "create", body, { headers: authHeader() });
  }

  enableAllSpec() {
    return axios.get(API_URL + "enablespec", { headers: authHeader() });
  }

  disableAllSpec() {
    return axios.get(API_URL + "disablespec", { headers: authHeader() });
  }

  getUsers() {
    return axios.get(API_URL + "getusers", { headers: authHeader() });
  }

  getLog() {
    return axios.get(API_URL + "log", { headers: authHeader() });
  }

  deleteUser(id) {
    return axios.delete(API_URL + "deleteuser/" + id, {
      headers: authHeader(),
    });
  }

  resetPassword(body) {
    return axios.post(API_URL + "resetpassword/", body, {
      headers: authHeader(),
    });
  }
}

export default new AdminService();
