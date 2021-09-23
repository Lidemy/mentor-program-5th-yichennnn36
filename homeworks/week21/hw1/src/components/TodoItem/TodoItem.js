import React, { useState } from 'react';
import { TodoBlock, Todo, TodoCheck, TodoEditInput, TodoFunctionButton } from './TodoItemStyle';

const TodoItem = ({ todo, handleDeleteTodo, handleToggleIsChecked, handleEditTodo }) => {

  const handleDelete = () => {
    handleDeleteTodo(todo.id);
  }

  const handleToggle = () => {
    handleToggleIsChecked(todo.id);
  }

  const [isEditing, setEditing] = useState(false);
  const [newTodo, setNewTodo] = useState('');

  const handleEdit = () => {
    setEditing(true);
    setNewTodo(todo.content);
  }
  const handleCancle = () => {
    setEditing(false);
  }

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  }

  const handleSave = () => {
    handleEditTodo(todo.id, newTodo);
    setEditing(false);
  }

  const editingTemplate = (
    <div>
      <Todo>
        <TodoEditInput className="form-check-input" type="text" id={todo.id} defaultChecked={todo.isChecked} value={newTodo} onChange={handleInputChange} />
      </Todo>
      <TodoFunctionButton>
        <button className="save-btn" onClick={handleSave}>SAVE</button>
        <button className="cancel-btn" onClick={handleCancle}>CANCEL</button>
      </TodoFunctionButton>
    </div>
  );

  const viewTemplate = (
    <div>
      <Todo>
        <TodoCheck className="form-check-input" type="checkbox" id={todo.id} defaultChecked={todo.isChecked} onChange={handleToggle} />
        <label htmlFor={todo.id}>{todo.content}</label>
      </Todo>
      <TodoFunctionButton>
        <button className="edit-btn" onClick={handleEdit}>EDIT</button>
        <button className="delete-btn" onClick={handleDelete}>X</button>
      </TodoFunctionButton>
    </div>
  );

  return (
    <TodoBlock data-todo-id={todo.id}>
      {isEditing ? editingTemplate : viewTemplate}
    </TodoBlock>
  )
}

export default TodoItem;
