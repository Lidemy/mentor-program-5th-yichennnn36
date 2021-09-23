import React from 'react';
import { FilterButtonBlock, ModeFilterButton, TheClearAllButton, Button, ButtonClearAll } from './TodoFilterButtonStyle';

const TodoFilterButton = ({ handleClickAll, handleClickActive, handlClickCompleted, handleClearAllCompleted }) => {

  return (
    <FilterButtonBlock>
      <ModeFilterButton>
        <Button onClick={() => handleClickAll()}>All</Button>
        <Button onClick={() => handleClickActive()}>Active</Button>
        <Button onClick={() => handlClickCompleted()}>Completed</Button>
      </ModeFilterButton>
      <TheClearAllButton>
        <ButtonClearAll onClick={() => handleClearAllCompleted()}>Clear completed</ButtonClearAll>
      </TheClearAllButton>
    </FilterButtonBlock>
  )
}

export default TodoFilterButton;