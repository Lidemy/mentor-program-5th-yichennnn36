import styled, { keyframes } from 'styled-components';
import { MEDIA_QUERY_LG } from '../../style';
import { slideInRight } from 'react-animations';
import { Link } from "react-router-dom";

const Nav = styled(Link)`
  margin: 0 14px;
  transition: transform 0.3s;
  text-decoration: none;

  &:hover {
    transform: scale(1.1);
  }
`;

const NavLogout = styled.a`
  margin: 0 14px;
  transition: transform 0.3s;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const Hamburger = styled.div`
  position: absolute;
  right: 30px;
  cursor: pointer;

  ${MEDIA_QUERY_LG} {
    visibility: hidden;
  }

  & svg {
    width: 40px;
    height: 40px;
  }
`;

const HamburgerNav = styled.div`
  position: absolute;
  top: 82px;
  right: -30px;
  width: 60vw;
  height: calc(100vh - 90px);
  background: ${props => props.theme.color.secondary};
  z-index: -1;
  display: flex;
  flex-direction: column;
  padding: 20px 0 0;
  animation: 0.5s ${keyframes`${slideInRight}`};

  & a {
    margin: 24px 50px;
  }
`;

export { Nav, NavLogout, Hamburger, HamburgerNav };