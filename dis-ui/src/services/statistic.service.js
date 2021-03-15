import axios from 'axios';
import authHeader from './auth-header';
import { LINK } from './LINK';

const API_URL = LINK + '/api/priorities';

class StatisticService {
  getAllKindergartenPriorities() {
    return axios.get(API_URL + '/all', { headers: authHeader() });
  }
}
export default new StatisticService();
