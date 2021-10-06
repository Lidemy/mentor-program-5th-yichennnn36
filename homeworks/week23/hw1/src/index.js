import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import TodoApp from './TodoApp';
import store from './redux/store';

const theme = {
  colors: {
    primary: '#8a8669',
    secondary: '#BC9272',
    normal: '#d1d2ce',
    border: '#e2e2dc',
    light: '#f7f7f6',
    dark: '#828282',
  }
};

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

  .todo-app {
    max-width: 600px;
    margin: 50px auto;
  }

  .todo-app h1 {
    font-family: 'Baloo 2', sans-serif;
    color: ${props => props.theme.colors.primary};
    font-size: 80px;
    text-align: center;
    font-weight: bold;
  }

  .active {
    background: ${props => props.theme.colors.secondary} !important;

    &:hover {
      color: ${props => props.theme.colors.light} !important;
    }
  }
`;

function App() {
  return <TodoApp />;
}

ReactDOM.render(
  <Provider store={store} >
    <ThemeProvider theme={theme} >
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'));

