import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { DndContext } from '@dnd-kit/core';
import { useState } from 'react';
import { Stack, Box } from '@mui/material';
import { TestItem } from './TestItem';

const INITIAL_ITEMS = [
  { id: crypto.randomUUID(), name: 'ソータブルアイテム　A' },
  { id: crypto.randomUUID(), name: 'ソータブルアイテム　B' },
  { id: crypto.randomUUID(), name: 'ソータブルアイテム　C' },
  { id: crypto.randomUUID(), name: 'ソータブルアイテム　D' },
  { id: crypto.randomUUID(), name: 'ソータブルアイテム　E' },
];

const SortTest = () => {
  const [items, setItems] = useState(INITIAL_ITEMS);
  return (
    <div className="App">
      <Box sx={{ padding: 1 }}>
        <Box sx={{ p: 2, border: '2px solid black' }}>
          <DndContext
          // onDragEnd={(event) => {
          //   const { active, over } = event;
          //   if (over == null) {
          //     return;
          //   }
          //   if (active.id !== over.id) {
          //     setItems((items) => {
          //       const oldIndex = items.findIndex(
          //         (item) => item.id === active.id
          //       );
          //       const newIndex = items.findIndex(
          //         (item) => item.id === over.id
          //       );
          //       return arrayMove(items, oldIndex, newIndex);
          //     });
          //   }
          // }}
          >
            <SortableContext items={items}>
              {/* <Stack spacing={2}> */}
              {items.map((item) => (
                <TestItem id={item.id} name={item.name} key={item.id} />
              ))}
              {/* </Stack> */}
            </SortableContext>
          </DndContext>
        </Box>
      </Box>
    </div>
  );
};

export default SortTest;
