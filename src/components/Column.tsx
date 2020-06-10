import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';

import { ColumnContainer, ColumnTitle } from '../styles';
import { Card } from './Card';
import { AddNewItem } from './AddNewItem';

import { useAppState } from '../context/AppStateContext';
import { useItemDrag } from '../hooks/useItemDrag';
import { DragItem } from '../types/DragItem';
import { isHidden } from '../utils/isHidden';

interface ColumnProps {
  text: string;
  index: number;
  id: string;
  isPreview?: boolean;
}

export const Column = ({ text, index, id, isPreview }: ColumnProps) => {
  const { state, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  // The hover callback is triggered whenever we move the dragged item above the drop target
  const [, drop] = useDrop({
    accept: 'COLUMN',
    hover(item: DragItem) {
      const dragIndex = item.index;
      const hoverIndex = index;
      console.log(item);
      // console.log('dragIndex: ' + dragIndex);
      // console.log('hoverIndex: ' + hoverIndex);

      // If we are hovering above the dragged item
      if (dragIndex === hoverIndex) {
        return;
      }

      // When we hover over another column we’ll dispatch a MOVE_LIST action to swap the dragged and target column positions
      dispatch({
        type: 'MOVE_LIST',
        payload: {
          dragIndex,
          hoverIndex,
        },
      });
      item.index = hoverIndex;
    },
  });
  const { drag } = useItemDrag({
    type: 'COLUMN',
    id,
    index,
    text,
  });

  drag(drop(ref));

  return (
    <ColumnContainer
      ref={ref}
      isHidden={isHidden(isPreview, state.draggedItem, 'COLUMN', id)}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {state.lists[index].tasks.map((task) => (
        <Card text={task.text} key={task.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={(text) =>
          dispatch({
            type: 'ADD_TASK',
            payload: {
              text,
              taskId: id,
            },
          })
        }
        dark
      />
    </ColumnContainer>
  );
};
