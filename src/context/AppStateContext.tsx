import React, { createContext, useReducer, useContext } from 'react';
import { v4 as uuid } from 'uuid';

import { findItemIndexById } from '../utils/findItemIndexById';
import { moveItem } from '../utils/moveItem';
import { DragItem } from '../components/drag/DragItem';

interface Task {
  id: string;
  text: string;
}

interface List {
  id: string;
  text: string;
  tasks: Task[];
}

export interface AppState {
  lists: List[];
  draggedItem: DragItem | undefined;
}

const appData: AppState = {
  lists: [
    {
      id: '0',
      text: 'To Do',
      tasks: [{ id: 'c0', text: 'Generate app scaffold' }],
    },
    {
      id: '1',
      text: 'In Progress',
      tasks: [{ id: 'c2', text: 'Learn Typescript' }],
    },
    {
      id: '2',
      text: 'Done',
      tasks: [{ id: 'c3', text: 'Begin to use static typing' }],
    },
  ],
  draggedItem: undefined,
};

interface AppStateContextProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

export const useAppState = () => {
  return useContext(AppStateContext);
};

// Discriminated union
// Each interface has a type property. This property will be our discriminant.
// It means that Typescript can look at this property and tell what will be the other fields of the interface.
type Action =
  | { type: 'ADD_LIST'; payload: string }
  | { type: 'ADD_TASK'; payload: { text: string; taskId: string } }
  | { type: 'MOVE_LIST'; payload: { dragIndex: number; hoverIndex: number } }
  | { type: "SET_DRAGGED_ITEM"; payload: DragItem | undefined }

const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'ADD_LIST': {
      return {
        ...state,
        lists: [
          ...state.lists,
          { id: uuid(), text: action.payload, tasks: [] },
        ],
      };
    }
    case 'ADD_TASK': {
      const targetLaneIndex = findItemIndexById(
        state.lists,
        action.payload.taskId
      );
      state.lists[targetLaneIndex].tasks.push({
        id: uuid(),
        text: action.payload.text,
      });

      return { ...state };
    }
    case 'MOVE_LIST': {
      const { dragIndex, hoverIndex } = action.payload;
      state.lists = moveItem(state.lists, dragIndex, hoverIndex);

      return { ...state };
    }
    // We need to hide the item that we are currently dragging.
    // To do this we need to know what kind of item are we dragging.
    case "SET_DRAGGED_ITEM": {
      return { ...state, draggedItem: action.payload }
    }
    default: {
      return state;
    }
  }
};

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(appStateReducer, appData);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};
