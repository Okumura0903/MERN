import axiosClient from './axiosClient';

const memoApi = {
  create: () => axiosClient.post('memo'),
  getAll: () => axiosClient.get('memo'),
  // login: (params) => axiosClient.post('memo/login', params),
  // logout: () => axiosClient.post('memo/logout'),
  // verify: () => axiosClient.post('memo/verify-token'),
};

export default memoApi;
