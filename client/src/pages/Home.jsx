import React, { useState } from 'react';
import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import memoApi from '../api/memoApi';
import { useDispatch, useSelector } from 'react-redux';
import { setMemo } from '../redux/slices/memoSlice';

const Home = () => {
  const memos = useSelector((state) => state.memo.value);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const createMemo = async () => {
    try {
      setLoading(true);
      const res = await memoApi.create();
      const newMemos = [res, ...memos];
      dispatch(setMemo(newMemos));
      navigate(`memo/${res._id}`);
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoadingButton variant="outlined" onClick={createMemo} loading={loading}>
        最初のメモを作成
      </LoadingButton>
    </Box>
  );
};

export default Home;
