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
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import memoApi from '../../../api/memoApi';
import { setMemo } from '../../../redux/slices/memoSlice';
import SortItem from '../sortItem/SortItem';
import { SortableContext } from '@dnd-kit/sortable';
import { DndContext, closestCenter } from '@dnd-kit/core';

const Sidebar = () => {
  const params = useParams();
  const user = useSelector((state) => state.user);
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
  }, [dispatch]);

  const addMemo = async () => {
    try {
      const res = await memoApi.create();
      const newMemos = [res, ...memos];
      dispatch(setMemo(newMemos));
      navigate(`memo/${res._id}`);
    } catch (err) {
      alert(err);
    }
  };
  const dndSort = async (event) => {
    const { active, over } = event;
    if (over == null || active.id === over.id) {
      return;
    }
    const activeMemo = memos.find((memo) => memo._id === active.id);
    const targetMemo = memos.find((memo) => memo._id === over.id);
    const sortedMemos = memos.map((memo) => {
      if (activeMemo.position >= targetMemo.position) {
        //上から下に移動（position大から小）
        if (activeMemo.position === memo.position) {
          return { ...memo, position: targetMemo.position };
        } else if (
          memo.position < activeMemo.position &&
          memo.position >= targetMemo.position
        ) {
          return { ...memo, position: memo.position + 1 };
        } else {
          return memo;
        }
      } else {
        //下から上に移動（position小から大）
        if (activeMemo.position === memo.position) {
          return { ...memo, position: targetMemo.position };
        } else if (
          memo.position > activeMemo.position &&
          memo.position <= targetMemo.position
        ) {
          return { ...memo, position: memo.position - 1 };
        } else {
          return memo;
        }
      }
    });
    // sortedMemos.map((memo) => {
    //   return {id:memo._id,position:memo.position}
    // });
    try {
      const newMemos = sortedMemos.sort((a, b) => {
        return b.position - a.position;
      });
      dispatch(setMemo(newMemos));
      await memoApi.sort(sortedMemos);
    } catch (err) {
      alert(err);
    }
  };
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
            <IconButton onClick={addMemo}>
              <AddBoxOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItemButton>
        <DndContext
          // collisionDetection={closestCenter}
          onDragEnd={(event) => {
            dndSort(event);
          }}
          // onDragEnd={(event) => {
          //   const { active, over } = event;
          //   if (over == null || active.id === over.id) {
          //     return;
          //   }
          //   const oldIndex = items.findIndex((item) => item.id === active.id);
          //   const newIndex = items.findIndex((item) => item.id === over.id);
          //   const newItems = arrayMove(items, oldIndex, newIndex);
          //   setItems(newItems);
          // }}
        >
          <SortableContext items={memos.map((memo) => memo._id)}>
            {memos.map((memo) => (
              <SortItem memo={memo} key={memo._id}>
                <Typography>
                  {memo.icon}
                  {memo.title}
                </Typography>
              </SortItem>
            ))}
          </SortableContext>
        </DndContext>
      </List>
    </Drawer>
  );
};

export default Sidebar;
