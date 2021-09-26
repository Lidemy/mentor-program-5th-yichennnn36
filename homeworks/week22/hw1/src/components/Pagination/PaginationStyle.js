import styled from 'styled-components';

const PaginationBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  font-family: 'Comfortaa', sans-serif;
  color: grey;
`;

const PageCode = styled.li`
  list-style: none;
  cursor: pointer;

  ${props => props.$status === "nomore" && `color: white`};
  ${props => props.$status === "activePage" && `color: black; font-size: 20px;`};

  & + & {
    margin-left: 20px;
  }
`;

export { PaginationBlock, PageCode };