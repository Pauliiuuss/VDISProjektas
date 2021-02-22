import axios from 'axios';
import authHeader from './auth-header';
import { LINK } from './LINK';

const API_URL = LINK + '/api/files/';

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append('file', file);

    return axios.post(API_URL + '/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return axios.get(API_URL + 'getfiles', { headers: authHeader() });
  }
}
export default new UploadFilesService();
