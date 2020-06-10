import { useDrag } from 'react-dnd';
import { useAppState } from '../context/AppStateContext';
import { DragItem } from '../components/drag/DragItem';

// This hook will return a drag method that accepts the ref of a draggable element (cards and columns).
// Whenever we start dragging the item - the hook will dispatch a SET_DRAG_ITEM action to save the item in the app state.
// When we stop dragging it will dispatch this action again with undefined as payload.
export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState();
  const [, drag] = useDrag({
    item,
    begin: () => dispatch({ type: 'SET_DRAGGED_ITEM', payload: item }),
    end: () =>
      dispatch({
        type: 'SET_DRAGGED_ITEM',
        payload: undefined,
      }),
  });

  return { drag };
};
