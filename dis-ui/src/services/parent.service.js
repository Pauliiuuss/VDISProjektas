import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.PUBLIC_URL + "/api/spec/";
// const API_URL = "http://localhost:8080/api/childform/";

class ParentService {
  sendForm(body) {
    console.log(body);
    return axios.post(API_URL + "add", body, { headers: authHeader() });
  }
}
export default new ParentService();
