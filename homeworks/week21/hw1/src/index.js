import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './components/TodoApp/TodoApp';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

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

const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }

  #root {
    height: 100%;
    width: 100%;
  }
`;

function App() {
  return <TodoApp />;
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
