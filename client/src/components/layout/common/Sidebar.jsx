import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

import React, { useEffect, useState } from 'react';
import assets from '../../../assets';
import authApi from '../../../api/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import memoApi from '../../../api/memoApi';
import { setMemo } from '../../../redux/slices/memoSlice';

const Sidebar = () => {
  const user = useSelector((state) => ({
    id: state.user.id,
    name: state.user.name,
  }));
  const memos = useSelector((state) => state.memo.value);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    await authApi.logout();
    navigate('/login');
  };
  useEffect(() => {
    const getMemos = async () => {
      try {
        const memos = await memoApi.getAll();
        dispatch(setMemo(memos));
      } catch (err) {
        alert(err);
      }
    };
    getMemos();
  }, []);
  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{ width: 250, height: '100vh' }}
    >
      <List
        sx={{
          width: 250,
          height: '100vh',
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItemButton onClick={logout}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2" fontWeight="700">
              {user.name}
            </Typography>
            <IconButton>
              <LogoutOutlinedIcon />
            </IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: '10px' }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2" fontWeight="700">
              お気に入り
            </Typography>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: '10px' }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2" fontWeight="700">
              プライベート
            </Typography>
            <IconButton>
              <AddBoxOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItemButton>
        {memos.map((memo) => (
          <ListItemButton
            sx={{ pl: '20px' }}
            component={Link}
            to={`/memo/${memo._id}}`}
          >
            <Typography>
              {memo.icon}
              {memo.title}
            </Typography>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
