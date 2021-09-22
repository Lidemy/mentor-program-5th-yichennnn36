import styled from 'styled-components';
import { Link } from "react-router-dom";
import { MEDIA_QUERY_MD, MEDIA_QUERY_LG } from '../../style';

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

export { HeaderContainer, SiteTitle, LeftNavBar, RightNavBar, Nav, NavLogout };