import axios from 'axios';

// const API_URL = process.env.PUBLIC_URL + "/api/auth/";
const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + 'signin', {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          sessionStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    sessionStorage.removeItem('user');
  }

  register(username, password) {
    return axios.post(API_URL + 'signup', {
      username,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  getUserById(id) {
    return axios.get(API_URL + id);
  }
}

export default new AuthService();
