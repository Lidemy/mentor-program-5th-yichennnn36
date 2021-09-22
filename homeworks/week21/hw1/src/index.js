import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import TodoApp from './TodoApp';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: '#8a8669',
    secondary: '#BC9272',
    normal: '#d1d2ce',
    border: '#e2e2dc',
    light: '#f7f7f6',
    dark: '#828282',
  }
}

function App() {
  return <TodoApp />;
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
