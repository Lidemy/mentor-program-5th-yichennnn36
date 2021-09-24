import styled, { keyframes } from 'styled-components';
import { pulse } from 'react-animations';

const Info = styled.div`
  font-family: 'Roboto Mono', monospace; 
  color: #498ac3;
  position: relative;

  @media screen and (min-width: 1000px) {
    width: 300px;
  }
`;

const GameDesc = styled.div`
  display: flex;
  align-items: center;
`;

const ChessIcon = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  margin-left: 10px;
  animation: 0.8s ${keyframes`${pulse}`} infinite;

  ${props => props.isBlackNext && `
    background: black; box-shadow: 2px 6px 8px #666;`};
  ${props => !props.isBlackNext && `
    background: white; box-shadow: 2px 6px 8px #666;`};
`;

const WinnerInfo = styled.div`
  background: #1d59b5;
  border-radius: 6px;
  padding: 30px 40px;
  text-align: center;
  position: absolute;
  top: 0;
  right: 16px;

  & div {
    font-size: 20px;
    font-weight: bold;
    color: white;
    margin-bottom: 20px;
  }

  @media screen and (min-width: 1000px) {
    top: 200px;
  }
`;

const Button = styled.button`
border: transparent;
background: black;
border-radius: 20px;
padding: 10px 16px;
color: white;
cursor: pointer;
transition: transform 0.3s;

&:hover {
  transform: scale(1.1);
}
`;

export { Info, GameDesc, ChessIcon, WinnerInfo, Button };