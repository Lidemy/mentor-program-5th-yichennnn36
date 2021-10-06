import React from 'react';
import { useSelector } from 'react-redux';
import { selectTodos, selectFilters } from '../../redux/selectors';
import Todo from '../Todo/Todo';

const TodoList = () => {
  const todos = useSelector(selectTodos);
  const filterState = useSelector(selectFilters);
  const filterMap = {
    all: () => true,
    incomplete: todo => !todo.completed,
    completed: todo => todo.completed
  };

  return (
    <>
      {
        todos && todos.length ?
          todos
            .filter(filterMap[filterState])
            .map(todo => {
              return <Todo key={`todo-${todo.id}`} todo={todo} />
            }) : "No Todos, yay!"
      }
    </>
  )
}

export default TodoList;