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

  getFormsById(id) {
    return axios.get(API_URL + "getforms/" + id, { headers: authHeader() });
  }

  getAllForms() {
    return axios.get(API_URL + "allforms", { headers: authHeader() });
  }

  deleteFormById(id) {
    return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
  }

  appStatus() {
    return axios.get(API_URL + "appstatus", { headers: authHeader() });
  }

  downloadUserData(id, currentUserName) {
    fetch(API_URL + "archivedata/" + id, {
      method: "GET",
      headers: authHeader(),
    }).then((response) => {
      response.blob().then((blob) => {
        var binaryData = [];
        binaryData.push(blob);
        var url = window.URL.createObjectURL(
          new Blob(binaryData, { type: "application/zip" })
        );
        var a = document.createElement("a");
        var date = new Date().toISOString().slice(0, 10);
        a.href = url;
        a.download = currentUserName + "_archyvuotiDuomenys_" + date + ".zip";
        a.click();
        a.remove();
      });
    });
  }
}
export default new ParentService();
