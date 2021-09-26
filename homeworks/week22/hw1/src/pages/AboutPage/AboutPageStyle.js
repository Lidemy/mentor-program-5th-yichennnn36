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

export { Container, FlashIcon };