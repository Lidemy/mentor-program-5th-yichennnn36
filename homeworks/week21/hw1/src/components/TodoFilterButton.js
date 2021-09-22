import React from 'react';
import styled from 'styled-components';
import '../styles.css';

// TodoFilterButton style components
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
`;
const TheClearAllButton = styled.div`
  text-align: right;
  margin-top: 20px;

  @media screen and (min-width:768px) {
    margin-top: 0;
  }
`;
const DefaultButton = styled.button`
  background-color: ${props => props.theme.colors.light};
  border-color: transparent;
  padding: 6px 8px;
  font-size: 18px;
  border-radius: 6px;
  transition: transform .2s;

  &:hover {
    transform: scale(1.1);
    color: ${props => props.theme.colors.secondary};
  }
  & + & {
    margin-left: 10px;
  }
`;
const ButtonFilterAll = styled(DefaultButton)``;
const ButtonFilterActive = styled(DefaultButton)``;
const ButtonFilterCompleted = styled(DefaultButton)``;
const ButtonClearAll = styled(DefaultButton)`
  background-color: ${props => props.theme.colors.normal};
`;

const TodoFilterButton = ({ handleClickAll, handleClickActive, handlClickCompleted, handleClearAllCompleted }) => {

  return (
    <FilterButtonBlock>
      <ModeFilterButton>
        <ButtonFilterAll onClick={() => handleClickAll()}>All</ButtonFilterAll>
        <ButtonFilterActive onClick={() => handleClickActive()}>Active</ButtonFilterActive>
        <ButtonFilterCompleted onClick={() => handlClickCompleted()}>Completed</ButtonFilterCompleted>
      </ModeFilterButton>
      <TheClearAllButton>
        <ButtonClearAll onClick={() => handleClearAllCompleted()}>Clear completed</ButtonClearAll>
      </TheClearAllButton>
    </FilterButtonBlock>
  )
}

export default TodoFilterButton;
