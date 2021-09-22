import styled, { keyframes } from 'styled-components';
import { rotateIn } from 'react-animations'

export const LoadingBlock = styled.div`
  font-size: ${props => props.theme.fontSize.fs_3};
  font-family: ${props => props.theme.font.secondary};
  color: ${props => props.theme.color.primary};
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & svg {
    width: 60px;
    height: 60px;
    animation: 3s ${keyframes`${rotateIn}`} infinite;
  }
`;
