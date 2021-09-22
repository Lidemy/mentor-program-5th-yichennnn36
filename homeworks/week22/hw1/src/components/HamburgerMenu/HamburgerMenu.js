import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../../contexts';
import { Nav, NavLogout, Hamburger, HamburgerNav } from './HamburgerMenuStyle';
import { ReactComponent as MenuWhiteButton } from '../../images/menu_white.svg';
import { ReactComponent as MenuBlackButton } from '../../images/menu_black.svg';
import { ReactComponent as CloseWhiteButton } from '../../images/close_white.svg';
import { ReactComponent as CloseBlackButton } from '../../images/close_black.svg';

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