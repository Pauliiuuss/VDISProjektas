import axios from "axios";
import authHeader from "./auth-header";
import { LINK } from "./LINK";

const API_URL = LINK + "/api/userdata/";

class UserService {
  getUserData(id) {
    return axios.get(API_URL + "get/" + id, { headers: authHeader() });
  }

  addData(id, body) {
    return axios.post(API_URL + "add/" + id, body, { headers: authHeader() });
  }

  updatePassword(id, oldPassword, newPasword) {
    return axios.put(API_URL + "password/" + id, [oldPassword, newPasword], {
      headers: authHeader(),
    });
  }
}
export default new UserService();
