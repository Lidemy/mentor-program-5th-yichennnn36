import styled from 'styled-components';

const FilterButtonBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;

  @media screen and (min-width:768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
const ModeFilterButton = styled.div`
  text-align: right;

  & button {
    background-color: ${props => props.theme.colors.light};
    border-color: transparent;
    padding: 6px 8px;
    margin-right: 10px;
    font-size: 18px;
    border-radius: 6px;
    transition: transform .2s;

    &:hover {
      transform: scale(1.1);
      color: ${props => props.theme.colors.primary};
    }

  }
`;
const TheClearAllButton = styled.div`
  text-align: right;
  margin-top: 20px;

  @media screen and (min-width:768px) {
    margin-top: 0;
  }

  & button {
    background-color: ${props => props.theme.colors.normal};
    border-color: transparent;
    padding: 6px 8px;
    font-size: 18px;
    border-radius: 6px;
    transition: transform .2s;

    &:hover {
      transform: scale(1.1);
      color: ${props => props.theme.colors.secondary};
    }
  }
`;

export { FilterButtonBlock, ModeFilterButton, TheClearAllButton };