import React from 'react';
import { Container, TodoTitle, TodoInputBlock, TodoInput, InputButton, TodoItemBlock } from './TodoAppStyle';
import TodoFilterButton from '../TodoFilterButton/TodoFilterButton';
import TodoItem from '../TodoItem/TodoItem';
import useTodos from '../../customHooks/useTodos';

const TodoApp = () => {
  const {
    inputValue,
    handleInputChange,
    todos,
    handleAddTodo,
    handleKeyPress,
    handleDeleteTodo,
    handleToggleIsChecked,
    handleEditTodo,
    filter,
    filterMap,
    handleClickAll,
    handleClickActive,
    handlClickCompleted,
    handleClearAllCompleted,
  } = useTodos();

  return (
    <Container>
      <TodoTitle className="animate__animated animate__bounceIn">Todo</TodoTitle>
      <TodoInputBlock>
        <TodoInput
          type="text"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress} />
        <InputButton onClick={handleAddTodo}>Add</InputButton>
      </TodoInputBlock>
      <TodoItemBlock>
        {
          todos
            .filter(filterMap[filter])
            .map(todo => <TodoItem key={todo.id} todo={todo} handleDeleteTodo={handleDeleteTodo} handleToggleIsChecked={handleToggleIsChecked} handleEditTodo={handleEditTodo} />)
        }
      </TodoItemBlock>
      <TodoFilterButton
        handleClickAll={handleClickAll}
        handleClickActive={handleClickActive}
        handlClickCompleted={handlClickCompleted}
        handleClearAllCompleted={handleClearAllCompleted} />
    </Container>
  )
}

export default TodoApp;
