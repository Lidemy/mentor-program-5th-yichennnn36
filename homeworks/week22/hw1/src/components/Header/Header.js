import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useHistory, useLocation } from "react-router-dom";
import { AuthContext } from '../../contexts';
import { setAuthToken } from '../../utils';
import { MEDIA_QUERY_MD, MEDIA_QUERY_LG } from '../../style';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

const HeaderContainer = styled.div`
  width: 100%;
  height: 120px;
  border-bottom: 1px solid ${props => props.theme.color.shadow};
  font-family: ${props => props.theme.font.primary};
  position: fixed;
  z-index: 3;
  background: white;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${props => props.$status === "backStage" && `background: black; color: white;`}

  & div > a {
    color: ${props => props.theme.color.primary};
    color: ${props => props.$status === "backStage" && `white;`};
  }
  & a:active {
    color: ${props => props.theme.color.primary};
  }
`;

const SiteTitle = styled(Link)`
  color: ${props => props.theme.color.primary};
  font-size: ${props => props.theme.fontSize.fs_4};
  font-weight: 800;
  text-decoration: none;
  position: absolute;
  left: 16px;

  ${MEDIA_QUERY_MD} {
    font-size: ${props => props.theme.fontSize.fs_2};
  }
  ${MEDIA_QUERY_LG} {
    left: 50%;
    transform: translate(-50%, 0);
  }
`;

const LeftNavBar = styled.div`
  visibility: hidden;

  ${MEDIA_QUERY_LG} {
    visibility: visible;
    display: flex;
    align-items: center;
    font-weight: 500;
  }
`;

const RightNavBar = styled.div`
  visibility: hidden;

  ${MEDIA_QUERY_LG} {
    visibility: visible;
    display: flex;
    align-items: center;
    font-weight: 500;
  }
`;

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