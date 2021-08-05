import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthContextProvider from './contexts/AuthContext';
import App from './App';

ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.getElementById('root')
);
