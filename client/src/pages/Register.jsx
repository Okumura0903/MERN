import { Box, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';

const Register = () => {
  const navigate = useNavigate();
  const [usernameErrText, setUsernameErrText] = useState('');
  const [passwordErrText, setPasswordErrText] = useState('');
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText('');
    setPasswordErrText('');
    setConfirmPasswordErrText('');
    const data = new FormData(e.target);
    const username = data.get('username').trim();
    const password = data.get('password').trim();
    const confirmPassword = data.get('confirmPassword').trim();

    let error = false;
    if (username === '') {
      setUsernameErrText('名前を入力してください');
      error = true;
    }
    if (password === '') {
      setPasswordErrText('パスワードを入力してください');
      error = true;
    }
    if (confirmPassword === '') {
      setConfirmPasswordErrText('確認用パスワードを入力してください');
      error = true;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordErrText('パスワードと確認用パスワードが異なります');
      error = true;
    }
    if (error) return;

    try {
      setLoading(true);
      await authApi.register({
        username,
        password,
        confirmPassword,
      });
      // localStorage.setItem('token', res.token);
      navigate('/');
    } catch (err) {
      const errors = err.data.errors;
      errors.forEach((err) => {
        if (err.path === 'username') {
          setUsernameErrText(err.msg);
        }
        if (err.path === 'password') {
          setPasswordErrText(err.msg);
        }
        if (err.path === 'confirm') {
          setConfirmPasswordErrText(err.msg);
        }
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          id="username"
          label="お名前"
          margin="normal"
          name="username"
          required
          helperText={usernameErrText}
          error={usernameErrText !== ''}
          disabled={loading}
        />
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          margin="normal"
          name="password"
          type="password"
          required
          helperText={passwordErrText}
          error={passwordErrText !== ''}
          disabled={loading}
        />
        <TextField
          fullWidth
          id="confirmPassword"
          label="確認用パスワード"
          margin="normal"
          name="confirmPassword"
          type="password"
          required
          helperText={confirmPasswordErrText}
          error={confirmPasswordErrText !== ''}
          disabled={loading}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={loading}
          color="primary"
          variant="outlined"
        >
          アカウント作成
        </LoadingButton>
      </Box>
      <Button component={Link} to="/login">
        既にアカウントを持っていますか？ログイン
      </Button>
    </>
  );
};

export default Register;
