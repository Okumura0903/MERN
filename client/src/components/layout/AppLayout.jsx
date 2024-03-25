import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { blue } from '@mui/material/colors';
import { Box, Container } from '@mui/material';
import notionLogo from '../../assets/images/notion-logo.png';
import authUtils from '../../utils/authUtil';
import Sidebar from './common/Sidebar';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';

const AppLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthencated();
      if (!user) {
        navigate('/login');
      } else {
        dispatch(setUser({ id: user._id, name: user.username }));
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
        <Box sx={{ display: 'flex' }}>
          <Sidebar />
          <Box sx={{ flexGrow: 1, p: 1, width: 'max-content' }}>
            <Outlet />
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default AppLayout;
