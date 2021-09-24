import { useRef, useState, useEffect, useCallback } from 'react';
import useInput from './useInput';

const writeTodosToLocalStorage = (todos) => {
  window.localStorage.setItem("todos", JSON.stringify(todos));
};

const useTodos = () => {
  let id = useRef(1);
  const { inputValue, setInputValue, handleInputChange } = useInput();
  const [todos, setTodos] = useState(() => {
    // run lazy initializers
    let todoData = JSON.parse(window.localStorage.getItem("todos")) || [];
    if (todoData.length > 0) {
      id.current = todoData[todoData.length - 1].id + 1;
    } else {
      todoData = [];
    }
    return todoData;
  });

  useEffect(() => {
    writeTodosToLocalStorage(todos);
  }, [todos]);

  const handleAddTodo = useCallback(() => {
    if (!inputValue.trim()) return alert('請輸入代辦事項！');

    setTodos([...todos, {
      id: id.current,
      content: inputValue,
      isChecked: false,
    }]);
    setInputValue('');
    id.current++;
  }, [setTodos, setInputValue, inputValue, todos]);

  const handleKeyPress = (e) => {
    if (e.key !== 'Enter') return;
    handleAddTodo();
  }

  const handleDeleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggleIsChecked = id => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo
      return {
        ...todo,
        isChecked: !todo.isChecked,
      }
    }))
  };

  const handleEditTodo = (id, newTodo) => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo;
      return {
        ...todo,
        content: newTodo,
      }
    }))
  };

  const [filter, setFilter] = useState('All');
  const filterMap = {
    All: () => true,
    Active: todo => !todo.isChecked,
    Completed: todo => todo.isChecked
  };

  const handleClickAll = () => {
    setFilter('All');
  };

  const handleClickActive = () => {
    setFilter('Active');
  };

  const handlClickCompleted = () => {
    setFilter('Completed');
  };

  const handleClearAllCompleted = () => {
    setTodos(todos.filter(todo => !todo.isChecked));
  };

  return {
    inputValue,
    setInputValue,
    handleInputChange,
    handleAddTodo,
    todos,
    setTodos,
    id,
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
  };
}

export default useTodos;