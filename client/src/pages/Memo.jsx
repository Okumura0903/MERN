import React, { useEffect, useState } from 'react';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import memoApi from '../api/memoApi';
import { useParams } from 'react-router-dom';
import { Box, IconButton, TextField } from '@mui/material';

const Memo = () => {
  const params = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  useEffect(() => {
    const getMemo = async () => {
      const res = await memoApi.getMemo(params.memoId);
      setTitle(res.title);
      setDescription(res.description);
    };
    getMemo();
  }, [params.memoId]);

  const updateTitle = async (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    try {
      const res = await memoApi.update(params.memoId, { title: newTitle });
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
        <IconButton variant="outlined" color="error">
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: '10px 50px' }}>
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
          onChange={updateTitle}
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
        />
      </Box>
    </>
  );
};

export default Memo;
