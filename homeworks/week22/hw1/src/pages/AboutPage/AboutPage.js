import React from 'react';
import { Container, FlashIcon } from './AboutPageStyle';

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