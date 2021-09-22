import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  width: 100vw;
  padding: 10px 0;
  background: #361058;
  color: #e7edf3;
  font-size: 12px;
  font-family: 'Comfortaa', sans-serif;
  text-align: center;
  letter-spacing: 1px;
  margin-top: 50px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      Copyright © 2021 YichenLiu Blog All rights Reserved.
    </FooterContainer>
  )
}

export default Footer;