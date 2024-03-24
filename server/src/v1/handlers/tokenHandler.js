const JWT = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');

//クライアントから渡されたJWTが正常か検証
// const tokenDecode = (req) => {
//   const bearerHeader = req.headers['authorization'];
//   if (bearerHeader) {
//     const bearer = bearerHeader.split(' ')[1];
//     try {
//       const decodedToken = JWT.verify(bearer, process.env.TOKEN_SECRET_KEY);
//       return decodedToken;
//     } catch {
//       return false;
//     }
//   } else {
//     return false;
//   }
// };

//クライアントから渡されたJWTが正常か検証（cookieを使用）
const tokenDecode = (req) => {
  try {
    const cookie = req.cookies.token;
    const decodedToken = JWT.verify(cookie, process.env.TOKEN_SECRET_KEY);
    return decodedToken;
  } catch {
    return false;
  }
};

//JWT認証を検証するためのミドルウェア
exports.verifyToken = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);
  if (tokenDecoded) {
    const user = await User.findById(tokenDecoded.id);
    if (!user) {
      return res.status(401).json('権限がありません');
    }
    req.user = user;
    next();
  } else {
    return res.status(401).json('権限がありません');
  }
};
