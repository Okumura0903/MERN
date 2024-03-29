import { Box, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';

const Login = () => {
  const navigate = useNavigate();
  const [usernameErrText, setUsernameErrText] = useState('');
  const [passwordErrText, setPasswordErrText] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText('');
    setPasswordErrText('');
    const data = new FormData(e.target);
    const username = data.get('username').trim();
    const password = data.get('password').trim();

    let error = false;
    if (username === '') {
      setUsernameErrText('名前を入力してください');
      error = true;
    }
    if (password === '') {
      setPasswordErrText('パスワードを入力してください');
      error = true;
    }
    if (error) return;

    try {
      setLoading(true);
      await authApi.login({
        username,
        password,
      });
      // localStorage.setItem('token', res.token);
      navigate('/');
    } catch (err) {
      console.log(err);
      const errors = err.data.errors;
      errors.forEach((err) => {
        if (err.param === 'username') {
          setUsernameErrText(err.msg);
        }
        if (err.param === 'password') {
          setPasswordErrText(err.msg);
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
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={loading}
          color="primary"
          variant="outlined"
        >
          ログイン
        </LoadingButton>
      </Box>
      <Button component={Link} to="/register">
        アカウントを持っていませんか？新規登録
      </Button>
    </>
  );
};

export default Login;
