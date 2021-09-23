import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/GameApp/GameApp';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    background: #eef0f3;
  }

  #root {
    height: 100%;
    width: 100%;
  }

  .game {
    width: 620px;
    min-height: 100%;
    margin: 30px auto -30px;
    padding: 20px;

    @media screen and (min-width: 1000px) {
      display: flex;
      width: 1000px;
    }
  }
`;

ReactDOM.render(
  <GlobalStyle>
    <Game />
  </GlobalStyle>,
  document.getElementById('root')
);