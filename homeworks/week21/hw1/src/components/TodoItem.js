import React, { useState } from 'react';
import styled from 'styled-components';
import '../styles.css';

// style components
// TodoItem style components
const TodoBlock = styled.div`
  border: 1px solid ${props => props.theme.colors.border};

  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    font-size: 22px;
    padding: 10px;
  }
  &:first-child {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  &:last-child {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  & + & {
    border-top-width: 0;
  }
`;

const Todo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const TodoCheck = styled.input`
  margin: 0 16px 0 10px;
  font-size: 18px;
  border: 2px solid ${props => props.theme.colors.primary};

  &:checked {
    background-color: ${props => props.theme.colors.secondary};
    border-color: ${props => props.theme.colors.secondary};
  }
  &:focus {
    border-color: ${props => props.theme.colors.normal};
    outline: 0;
    box-shadow: 0 0 0 3px ${props => props.theme.colors.light};;
  }
  &:checked ~ label {
    text-decoration: line-through;
    color: ${props => props.theme.colors.normal};
    font-style: italic;
  }
  & ~ label {
    font-size: 20px; 
  }
`;

const TodoEditInput = styled.input`
  min-width: 200px;
  height: 36px;
  padding: 10px;
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 6px;

  &:focus {
    border-color: ${props => props.theme.colors.secondary};
    outline: 0;
    box-shadow: 0 0 0 5px ${props => props.theme.colors.light};;
  }
`;

const TodoFunctionButton = styled.div`
  font-size: 20px;

  @media screen and (min-width:768px) {
    font-size: 24px;
  }

  & button {
    border-color: transparent;
    background-color: transparent;
    color: ${props => props.theme.colors.primary};
    margin-right: 6px;

    @media screen and (min-width:768px) {
      margin-right: 10px;
    }
  }
  & button:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;


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
