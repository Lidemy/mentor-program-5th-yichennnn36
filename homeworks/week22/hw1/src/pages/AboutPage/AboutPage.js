import React from 'react';
import styled, { keyframes } from 'styled-components';
import { flash } from 'react-animations'

const Container = styled.div`
  max-width: 400px;
  margin: 160px auto 20px;
  padding: 20px;
  text-align: center;
  line-height: 30px;
  font-family: 'Comfortaa', sans-serif;
`;

const FlashIcon = styled.div`
  display: flex;
  justify-content: center;
  color: rgb(255, 152, 0);
  margin-bottom: 20px;

  & div {
    animation: 5s ${keyframes`${flash}`} infinite;
  }
  & div + div {
    margin-left: 10px;
  }
`;


const AboutPage = () => {
  return (
    <Container>
      <FlashIcon>
        <div>♥</div>
        <div>♥</div>
        <div>♥</div>
      </FlashIcon>
      <div>
        這是一個 React 的 SPA 部落格
        <br />
        你可以註冊會員、登入後發表文章
        <br />
        主畫面是所有文章及部分內容
        <br />
        想要看到所有文章的標題列表可以點 Articles List
      </div>
    </Container>
  )
}

export default AboutPage;