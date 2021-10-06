import React from 'react';
import AddTodo from './components/AddTodo/AddTodo';
import TodoList from './components/TodoList/TodoList';
import VisibilityFilters from './components/VisibilityFilters/VisibilityFilters';

function TodoApp() {
  return (
    <div className="todo-app">
      <h1>Todo</h1>
      <AddTodo />
      <TodoList />
      <VisibilityFilters />
    </div>
  );
}

export default TodoApp;
