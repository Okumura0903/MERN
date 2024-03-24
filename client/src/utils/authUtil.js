import authApi from '../api/authApi';

const authUtils = {
  //JWTチェック
  // isAuthencated: async () => {
  //   const token = localStorage.getItem('token');
  //   if (!token) return false;
  //   try {
  //     const res = await authApi.verify(token);
  //     return res.user;
  //   } catch {
  //     return false;
  //   }
  // },

  //JWTチェックcookieを使用
  isAuthencated: async () => {
    try {
      const res = await authApi.verify();
      return res.user;
    } catch {
      return false;
    }
  },
};

export default authUtils;
