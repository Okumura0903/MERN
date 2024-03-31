import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@mui/material';

export const TestItem = ({ id, name }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });
  console.log(transform);

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <Box
        sx={{
          border: '1px solid black',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'white',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        <Box sx={{ ml: 2 }}>{name}</Box>
      </Box>
    </div>
  );
};
