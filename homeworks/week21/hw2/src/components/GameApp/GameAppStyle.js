import styled from 'styled-components';

const Board = styled.div`
  display: inline-block;
  margin-right: 40px;
`;

const Row = styled.div`
  display: flex;
`;

const Footer = styled.div`
  width: 100%;
  background: black;
  padding: 16px 0;
  color: white;
  font-size: 14px;
  text-align: center;
  margin-top: 120px;

  @media screen and (min-width: 1000px) {
    margin-top: 0;
  }
`;

export { Board, Row, Footer };
