import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { AppStateProvider } from './context/AppStateContext';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
