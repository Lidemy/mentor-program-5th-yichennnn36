import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TodoInputBlock, TodoInput, InputButton } from './AddTodoStyle';
import { addTodo } from '../../redux/actions';

const AddTodo = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (!value.trim()) return;

    dispatch(addTodo(value));
    setValue('');
  }

  const handleKeyPress = (e) => {
    if (e.key !== 'Enter') return;

    dispatch(addTodo(value));
    setValue('');
  };

  return (
    <TodoInputBlock>
      <TodoInput
        type="text"
        placeholder="What needs to be done?"
        value={value}
        onChange={handleInput}
        onKeyPress={handleKeyPress}
      />
      <InputButton onClick={handleAddTodo}>Add</InputButton>
    </TodoInputBlock>
  )
};

export default AddTodo;