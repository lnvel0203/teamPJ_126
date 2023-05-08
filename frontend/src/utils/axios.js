import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081';

const axiosServices = axios.create({
  baseURL: API_BASE_URL, // 여기에 백엔드 API 주소를 입력
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosServices.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;

// 추가

// 리스트
export const getUsers = () => axiosServices.get('/members');
// 업데이트
export const updateUser = (id, updateData) => axiosServices.put(`/users/${id}`, updateData);

// export const getUser = (id) => axiosInstance.get(`/users/${id}`);
// export const addUser = (userData) => axiosInstance.post('/users', userData);
// export const updateUser = (id, updateData) => axiosInstance.put(`/users/${id}`, updateData);
// export const deleteUser = (id) => axiosInstance.delete(`/users/${id}`);

//부석현
//axios.helper
axios.defaults.baseURL = 'http://localhost:8081';
//axios.defaults.headers.post["Content-type"] = 'application/json'

export const getAuthToken = () => {
  return window.localStorage.getItem('auth_token');
};

export const setId = (id) => {
  window.localStorage.setItem('id', id);
};

export const setAuthToken = (token) => {
  //토큰이름은 내맘데로
  window.localStorage.setItem('auth_token', token);

  alert(token);
  //setAuth_token(token)과 같다
};

export const requestLogin = (method, url, data) => {
  let headers = {};

  if (getAuthToken() !== null && getAuthToken() !== 'null') {
    headers = {
      Authorization: 'Bearer ${getAuthToken()'
    };
  }

  console.log('axios');
  console.log('method : ', method);
  console.log('url : ', url);
  console.log('data : ', data);
  console.log('headers : ', headers);

  return axios({
    method: method,
    headers: headers,
    url: url,
    data: data
  });
};
