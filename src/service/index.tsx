import { DataResponse, UserInfoResponse } from '~/config/types';
import { fetchData, postData } from '~/service/http';

const API_URL = "http://localhost:8010"

const ApiService = {
  getUserInfo: (): Promise<DataResponse<UserInfoResponse>> => {
    return fetchData(`${API_URL}/api/get_info`)
  },

  login: (username: string, password: string): Promise<DataResponse<UserInfoResponse>> => {
    return postData(`${API_URL}/api/login`, {}, { username, password });
  },
  logout: (): Promise<DataResponse<any>> => {
    return postData(`${API_URL}/api/logout`, {}, {});
  }
}
export default ApiService;