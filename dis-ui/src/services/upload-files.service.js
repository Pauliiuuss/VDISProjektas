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
      // eslint-disable-next-line no-dupe-keys
      headers: authHeader(),
      onUploadProgress,
    });
  }

  getFiles() {
    return axios.get(API_URL + "all", { headers: authHeader() });
  }

  downloadFile(item) {
    fetch(item.url, {
      method: "GET",
      headers: authHeader(),
    }).then((response) => {
      response.blob().then((blob) => {
        var binaryData = [];
        binaryData.push(blob);
        var url = window.URL.createObjectURL(
          new Blob(binaryData, { type: "application/pdf" })
        );
        var a = document.createElement("a");
        a.href = url;
        a.download = item.docName;
        a.click();
        a.remove();
      });
    });
  }
}
export default new UploadFilesService();
