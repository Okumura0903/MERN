import axiosClient from './axiosClient';

const authApi = {
  register: (params) => axiosClient.post('auth/register', params),
  login: (params) => axiosClient.post('auth/login', params),
  logout: () => axiosClient.post('auth/logout'),
  verify: () => axiosClient.post('auth/verify-token'),
};

export default authApi;
