import React from 'react';
import styled from 'styled-components';
import TodoFilterButton from './components/TodoFilterButton';
import TodoItem from './components/TodoItem';
import useTodos from './custom_hooks/useTodos';
import './styles.css';

// style components
// TodoApp style components
const Container = styled.div`
  max-width: 650px;
  font-family: 'Baloo 2', sans-serif;
  margin: 50px auto;
  text-align: center;
  padding: 12px;
`;

const TodoTittle = styled.h1`
  font-size: 90px;
  font-weight: bolder;
  color: ${props => props.theme.colors.primary};
`;

const TodoInputBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`;

const TodoInput = styled.input`
  flex: 1;
  height: 56px;
  font-size: 22px;
  padding: 10px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  border: 1px solid ${props => props.theme.colors.border};
  border-right: transparent;
`;

const InputButton = styled.button`
  height: 56px;
  width: 60px;
  font-size: 22px;
  background-color: ${props => props.theme.colors.light};
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  border: 1px solid ${props => props.theme.colors.dark};
`;

const TodoItemBlock = styled.div``;

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
      <TodoTittle className="animate__animated animate__bounceIn">Todo</TodoTittle>
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
