import axios from "axios";
import authHeader from "./auth-header";

// const API_URL = process.env.PUBLIC_URL + '/api/admin/';
const API_URL = "http://localhost:8080/api/spec/";

class SpecService {
  create(body) {
    return axios.post(API_URL + "create", body, { headers: authHeader() });
  }

  getKindergartens() {
    return axios.get(API_URL + "getkindergartens", { headers: authHeader() });
  }
}

export default new SpecService();
