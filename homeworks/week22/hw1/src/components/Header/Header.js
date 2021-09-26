import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { HeaderContainer, SiteTitle, LeftNavBar, RightNavBar, Nav, NavLogout } from './HeaderStyle';
import { AuthContext } from '../../contexts';
import { setAuthToken } from '../../utils';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const { user, setUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setAuthToken('');
    setUser(null);

    if (location.pathname !== "/") {
      history.push("/");
    }
  };

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  }

  // 當網址改變了 就把漢堡選單關掉
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname])

  return (
    <HeaderContainer $status={user && user !== 'fetching' ? "backStage" : "frontStage"}>
      <HamburgerMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleMenuClick={handleMenuClick}
        handleLogout={handleLogout}
      />
      <LeftNavBar>
        <Nav to="/about">About</Nav>
        <Nav to="/list">Articles List</Nav>
        {user && <Nav to="/publish">Publish</Nav>}
      </LeftNavBar>
      <SiteTitle to="/">thosepplnexto</SiteTitle>
      <RightNavBar>
        {!user && <Nav to="/login">Login</Nav>}
        {!user && <Nav to="/register">Register</Nav>}
        {user && <NavLogout onClick={handleLogout}>Log out</NavLogout>}
      </RightNavBar>
    </HeaderContainer>
  )
}

export default Header;