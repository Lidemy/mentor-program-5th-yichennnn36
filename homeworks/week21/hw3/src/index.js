import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: "#fad312",
    alert: "#e74149",
  },
  fontSize: {
    fs_1: "3rem",
    fs_2: "2.5rem",
    fs_3: "2rem",
    fs_4: "1.5rem",
    fs_5: "1.25rem",
    fs_6: "1rem",
  }
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>, document.getElementById('root')
);
