import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/styles/ProductDetails.scss';
import './assets/styles/Header.scss';
import './assets/styles/Filters.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
