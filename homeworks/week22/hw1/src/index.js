import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import { ThemeProvider } from "styled-components";

const theme = {
  color: {
    primary: '#551a8b',
    secondary: '#c6b3d2',
    normal: 'black',
    shadow: '#e7edf3',
    alert: 'tomato'
  },
  fontSize: {
    fs_1: "3rem",
    fs_2: "2.5rem",
    fs_3: "2rem",
    fs_4: "1.5rem",
    fs_5: "1.25rem",
    fs_6: "1rem",
    fs_7: "0.75rem"
  },
  font: {
    primary: "'Comfortaa', sans-serif",
    secondary: "'Abril Fatface', sans-serif"
  }
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>, document.getElementById('root')
);
