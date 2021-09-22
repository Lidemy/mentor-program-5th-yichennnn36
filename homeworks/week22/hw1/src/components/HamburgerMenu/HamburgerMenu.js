import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { slideInRight } from 'react-animations';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { AuthContext } from '../../contexts';
import { MEDIA_QUERY_LG } from '../../style';
import { ReactComponent as MenuWhiteButton } from '../../images/menu_white.svg';
import { ReactComponent as MenuBlackButton } from '../../images/menu_black.svg';
import { ReactComponent as CloseWhiteButton } from '../../images/close_white.svg';
import { ReactComponent as CloseBlackButton } from '../../images/close_black.svg';

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

const HamburgerMenu = ({
  isOpen,
  setIsOpen,
  handleMenuClick,
  handleLogout
}) => {
  const { user } = useContext(AuthContext);

  return (
    <Hamburger >
      {user ?
        <>
          {isOpen ?
            <CloseWhiteButton onClick={handleMenuClick} /> :
            <MenuWhiteButton onClick={handleMenuClick} />
          }
        </>
        :
        <>
          {isOpen ?
            <CloseBlackButton onClick={handleMenuClick} /> :
            <MenuBlackButton onClick={handleMenuClick} />
          }
        </>
      }
      {isOpen &&
        <HamburgerNav isOpen={isOpen}>
          <Nav to="/about">About</Nav>
          <Nav to="/list">Articles List</Nav>
          {user && <Nav to="/publish">Publish</Nav>}
          {!user && <Nav to="/login">Login</Nav>}
          {!user && <Nav to="/register">Register</Nav>}
          {user && <NavLogout onClick={handleLogout}>Log out</NavLogout>}
        </HamburgerNav>
      }
    </Hamburger>
  )
};

HamburgerMenu.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  handleMenuClick: PropTypes.func,
  handleLogout: PropTypes.func
};

export default HamburgerMenu;