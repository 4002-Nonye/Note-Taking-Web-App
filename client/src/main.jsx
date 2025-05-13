import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import axios from 'axios';

window.axios = axios;
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
