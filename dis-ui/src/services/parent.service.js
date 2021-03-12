import axios from "axios";
import authHeader from "./auth-header";
import { LINK } from "./LINK";

const API_URL = LINK + "/api/parent/";

class ParentService {
  sendForm(body) {
    return axios.post(API_URL + "addform", body, { headers: authHeader() });
  }

  getAllData(id) {
    return axios.get(API_URL + "getdata/" + id, { headers: authHeader() });
  }

  updateForm(id, body) {
    return axios.put(API_URL + "updateform/" + id, body, {
      headers: authHeader(),
    });
  }

  getAllForms(id) {
    return axios.get(API_URL + "getforms/" + id, { headers: authHeader() });
  }

  deleteFormById(id) {
    return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
  }

  appStatus() {
    return axios.get(API_URL + "appstatus", { headers: authHeader() });
  }

  downloadUserData(id) {
    fetch(API_URL + "archivedata/" + id, {
      method: "GET",
      headers: authHeader(),
    }).then((response) => {
      console.log(response);
      response.blob().then((blob) => {
        console.log(blob);
        var binaryData = [];
        binaryData.push(blob);
        var url = API_URL + "archivedata/" + id;
        var a = document.createElement("a");
        a.href = url;
        a.click();
        a.remove();
      });
    });
  }
}
export default new ParentService();
