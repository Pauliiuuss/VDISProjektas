import axios from "axios";
import authHeader from "./auth-header";
import { LINK } from "./LINK";

const API_URL = LINK + "/api/documents/";

class UploadFilesService {
  upload(id, file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    return axios.post(API_URL + "add/" + id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return axios.get(API_URL + "all", { headers: authHeader() });
  }
}
export default new UploadFilesService();
