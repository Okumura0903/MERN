const router = require('express').Router();

const { query, body, validationResult } = require('express-validator');
require('dotenv').config();

const User = require('../models/user');
const validation = require('../handlers/validation');
const userController = require('../controllers/user');
const tokenHandler = require('../handlers/tokenHandler');

//ユーザー新規登録API
router.post(
  '/register',
  body('username')
    .isLength({ min: 8 })
    .withMessage('ユーザー名は8文字以上である必要があります'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('パスワードは8文字以上である必要があります'),
  body('confirmPassword')
    .isLength({ min: 8 })
    .withMessage('確認用パスワードは8文字以上である必要があります')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('確認用パスワードが一致しません'),
  body('username').custom(async (value) => {
    const existingUser = await User.findOne({ username: value });
    if (existingUser) {
      throw new Error('このユーザーは既に使われています');
    }
  }),
  validation.validate,
  userController.register
);

//ログイン用API
router.post(
  '/login',
  body('username')
    .isLength({ min: 8 })
    .withMessage('ユーザー名は8文字以上である必要があります'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('パスワードは8文字以上である必要があります'),
  validation.validate,
  userController.login
);

//JWT認証
router.post('/verify-token', tokenHandler.verifyToken, (req, res) => {
  return res.status(200).json({ user: req.user });
});

//ログアウト
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({});
});

module.exports = router;
