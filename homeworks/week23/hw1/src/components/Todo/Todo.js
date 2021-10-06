import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TodoBlock, TodoContent, TodoCheck, TodoEditInput, TodoFunctionButton } from './TodoStyle';
import { deleteTodo, toggleTodo, editTodo } from '../../redux/actions';

const Todo = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState('');

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setNewContent(todo.content);
  };

  const handleEditInput = (e) => {
    setNewContent(e.target.value);
  };

  const handleSave = () => {
    dispatch(editTodo(todo.id, newContent));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const editingTemplate = (
    <>
      <TodoContent>
        <TodoEditInput
          type="text"
          value={newContent}
          onChange={handleEditInput}
        />
      </TodoContent>
      <TodoFunctionButton>
        <button onClick={handleSave}>SAVE</button>
        <button onClick={handleCancel}>CANCEL</button>
      </TodoFunctionButton>
    </>
  );

  const viewTemplate = (
    <>
      <TodoContent>
        <TodoCheck
          className="form-check-input"
          type="checkbox"
          id={todo.id}
          defaultChecked={todo.completed}
          onChange={() => handleToggle(todo.id)}
        />
        <label htmlFor={todo.id}>{todo.content}</label>
      </TodoContent>
      <TodoFunctionButton>
        <button onClick={handleEdit}>EDIT</button>
        <button onClick={handleDelete}>X</button>
      </TodoFunctionButton>
    </>
  );
  return (
    <TodoBlock key={`todo-${todo.id}`}>
      {isEditing ? editingTemplate : viewTemplate}
    </TodoBlock>
  )
}

export default Todo;