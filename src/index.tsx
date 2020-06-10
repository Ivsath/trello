import React from 'react';
import ReactDOM from 'react-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import App from './components/App';
import { AppStateProvider } from './context/AppStateContext';

import './index.css';

// The Dnd provider will add a dragging context to our app.
// It will allow us to use useDrag and useDrop hooks inside our components.
ReactDOM.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </DndProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
