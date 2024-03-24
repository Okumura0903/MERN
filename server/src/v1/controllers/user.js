const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.register = async (req, res) => {
  //パスワードの受け取り
  const password = req.body.password;
  try {
    //パスワードの暗号化
    req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
    //ユーザーの新規作成
    const user = await User.create(req.body);
    //JWTの発行
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: '24h',
    });
    return res.status(200).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};

//ユーザーログイン用API
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({
        errors: [
          {
            param: 'username',
            msg: 'ユーザー名が無効です',
          },
        ],
      });
    }
    //パスワードの照合
    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
    if (decryptedPassword !== password) {
      return res.status(401).json({
        errors: [
          {
            param: 'password',
            msg: 'パスワードが無効です',
          },
        ],
      });
    }
    //JWTの発行
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: '24h',
    });
    return res.status(201).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};
