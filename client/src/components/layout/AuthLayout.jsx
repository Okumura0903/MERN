import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { blue } from '@mui/material/colors';
import { Box, Container } from '@mui/material';
import notionLogo from '../../assets/images/notion-logo.png';
import authUtils from '../../utils/authUtil';

const AuthLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authUtils.isAuthencated();
      if (isAuth) {
        navigate('/');
      }
    };
    checkAuth();
  }, [navigate]);

  const theme = createTheme({
    palette: { primary: blue },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 6,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <img
              src={notionLogo}
              alt=""
              style={{ width: 100, height: 100, marginBottom: 3 }}
            />
            Notionクローン開発
          </Box>
          <Outlet />
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default AuthLayout;
