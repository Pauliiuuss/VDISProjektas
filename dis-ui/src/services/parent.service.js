import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = process.env.PUBLIC_URL + '/api/parent/';
const API_URL = 'http://localhost:8080/api/parent/';

class ParentService {
  sendForm(body) {
    console.log(body);
    return axios.post(API_URL + 'addform', body, { headers: authHeader() });
  }

  getAllData(id) {
    console.log(id);
    return axios.get(API_URL + 'getdata/' + id, { headers: authHeader() });
  }

  updateForm(id, body) {
    console.log(id);
    return axios.put(API_URL + 'updateform/' + id, body, {
      headers: authHeader(),
    });
  }

  getAllForms(id) {
    console.log(id);

    return axios.get(API_URL + 'getforms/' + id, { headers: authHeader() });
  }
}
export default new ParentService();
