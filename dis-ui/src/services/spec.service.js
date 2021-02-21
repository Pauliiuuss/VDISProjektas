import axios from "axios";
import { Link } from "react-router-dom";
import authHeader from "./auth-header";
import { LINK } from "./LINK";

const API_URL = LINK + "/api/spec/";

class SpecService {
  create(body) {
    return axios.post(API_URL + "create", body, { headers: authHeader() });
  }

  amend(id, body) {
    return axios.post(API_URL + "amend/" + id, body, { headers: authHeader() });
  }

  amendGroup(groupId, body) {
    return axios.post(API_URL + "amend/group/" + groupId, body, {
      headers: authHeader(),
    });
  }

  createGroup(id, body) {
    return axios.post(API_URL + "create/" + id, body, {
      headers: authHeader(),
    });
  }

  getKindergartens() {
    return axios.get(API_URL + "getkindergartens", { headers: authHeader() });
  }

  getGroups(id) {
    return axios.get(API_URL + "getgroups/" + id, { headers: authHeader() });
  }

  getForms(id) {
    return axios.get(API_URL + "getforms/" + id, { headers: authHeader() });
  }

  getKindergarten(id) {
    return axios.get(API_URL + "getkindergarten/" + id, {
      headers: authHeader(),
    });
  }
  getFormsByKindergarten(id) {
    return axios.get(API_URL + "getformsbykindergarten/" + id, {
      headers: authHeader(),
    });
  }
}

export default new SpecService();
