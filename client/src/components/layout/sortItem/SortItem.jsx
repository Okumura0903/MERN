import React from 'react';
import { Box, ListItemButton } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Link, useParams } from 'react-router-dom';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
const SortItem = ({ memo, children }) => {
  const params = useParams();
  const {
    isDragging,
    // 並び替えのつまみ部分に設定するプロパティ
    setActivatorNodeRef,
    attributes,
    listeners,
    // DOM全体に対して設定するプロパティ
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: memo._id });
  return (
    <Box
      ref={setNodeRef}
      sx={{
        display: 'flex',
        alignItems: 'center',
        // cursor: isDragging ? 'grabbing' : 'grab',
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <DragIndicatorIcon
        ref={setActivatorNodeRef}
        sx={{
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        {...attributes}
        {...listeners}
      />
      <ListItemButton
        sx={{ pl: '20px' }}
        component={Link}
        to={`/memo/${memo._id}`}
        key={memo._id}
        selected={params.memoId === memo._id}
      >
        {children}
      </ListItemButton>
    </Box>
  );
};

export default SortItem;
