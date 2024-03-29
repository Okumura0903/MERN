import React, { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import memoApi from '../api/memoApi';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, IconButton, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setMemo } from '../redux/slices/memoSlice';
import EmojiPicker from '../components/layout/common/EmojiPicker';

const Memo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const memos = useSelector((state) => state.memo.value);

  const params = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  useEffect(() => {
    const getMemo = async () => {
      const res = await memoApi.getMemo(params.memoId);
      setTitle(res.title);
      setDescription(res.description);
      setIcon(res.icon);
    };
    getMemo();
  }, [params.memoId]);

  const updateTitle = async () => {
    try {
      const res = await memoApi.update(params.memoId, { title: title });
    } catch (err) {
      alert(err);
    }
  };
  useDebounce(updateTitle, 500, [title]);

  const updateDescription = async () => {
    try {
      const res = await memoApi.update(params.memoId, {
        description: description,
      });
    } catch (err) {
      alert(err);
    }
  };
  useDebounce(updateDescription, 500, [description]);

  const deleteMemo = async () => {
    try {
      const res = await memoApi.delete(params.memoId);
      const newMemos = memos.filter((memo) => memo._id !== params.memoId);
      dispatch(setMemo(newMemos));
      if (newMemos.length === 0) {
        navigate('/');
      } else {
        navigate(`/memo/${newMemos[0]._id}`);
      }
    } catch (err) {
      alert(err);
    }
  };
  const onIconChange = async (newIcon) => {
    let temp = [...memos];
    const index = temp.findIndex((e) => e._id === params.memoId);
    temp[index] = { ...temp[index], icon: newIcon };
    setIcon(newIcon);
    dispatch(setMemo(temp));
    try {
      await memoApi.update(params.memoId, { icon: newIcon });
    } catch (err) {
      alert(err);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton variant="outlined" color="error" onClick={deleteMemo}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: '10px 50px' }}>
        <Box>
          <EmojiPicker icon={icon} onChange={onIconChange} />
          <TextField
            placeholder="無題"
            variant="outlined"
            fullWidth
            sx={{
              '.MuiOutlinedInput-input': { padding: 0 },
              '.MuiOutlinedInput-notchedOutline': { border: 'none' },
              '.MuiOutlinedInput-root': { fontSize: '2rem', fontWeight: '700' },
            }}
            value={title}
            // onChange={updateTitle}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            placeholder="追加"
            variant="outlined"
            fullWidth
            sx={{
              '.MuiOutlinedInput-input': { padding: 0 },
              '.MuiOutlinedInput-notchedOutline': { border: 'none' },
              '.MuiOutlinedInput-root': { fontSize: '1rem' },
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
      </Box>
    </>
  );
};

export default Memo;
