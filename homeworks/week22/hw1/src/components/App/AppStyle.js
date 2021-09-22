import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100vw;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  }
  #root {
  height: 100%;
  width: 100%;
  }
  .content {
    padding-bottom: 20px;
  }
`;

const Root = styled.div`
  min-height: 100%;
  margin-bottom: -20px;
`;

export { GlobalStyle, Root };