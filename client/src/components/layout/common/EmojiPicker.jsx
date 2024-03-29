import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const EmojiPicker = ({ icon, onChange }) => {
  const [selectedEmoji, setSelectedEmoji] = useState();
  const [isShowPicker, setIsShowPicker] = useState(false);
  useEffect(() => {
    setSelectedEmoji(icon);
  }, [icon]);
  const showPicker = () => {
    setIsShowPicker((prev) => !prev);
  };
  const selectEmoji = (e) => {
    const emojiCode = e.unified.split('-');
    let codesArray = [];
    emojiCode.forEach((el) => {
      codesArray.push('0x' + el);
    });
    const emoji = String.fromCodePoint(...codesArray);
    console.log(emoji);
    setIsShowPicker(false);
    onChange(emoji);
  };
  return (
    <Box>
      <Typography
        variant="h3"
        fontWeight="700"
        sx={{ cursor: 'pointer' }}
        onClick={showPicker}
      >
        {selectedEmoji}
      </Typography>
      <Box
        sx={{
          position: 'absolute',
          zIndex: 100,
          display: isShowPicker ? 'block' : 'none',
        }}
      >
        <Picker onEmojiSelect={selectEmoji} />
      </Box>
    </Box>
  );
};

export default EmojiPicker;
