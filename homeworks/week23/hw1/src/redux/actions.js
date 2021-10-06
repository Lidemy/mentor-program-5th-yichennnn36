import { ADD_TODO, DELETE_TODO, TOGGLE_TODO, EDIT_TODO, SET_FILTER, CLEAR_ALL_COMPLETED } from './actionTypes';

// action creater
export const addTodo = (content) => {
  return {
    type: ADD_TODO,
    payload: {
      content
    }
  }
};

export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    payload: {
      id
    }
  }
};

export const toggleTodo = (id) => {
  return {
    type: TOGGLE_TODO,
    payload: {
      id
    }
  }
};

export const editTodo = (id, newContent) => {
  return {
    type: EDIT_TODO,
    payload: {
      id,
      content: newContent
    }
  }
};

export const setFilter = (filter) => {
  return {
    type: SET_FILTER,
    payload: {
      filter
    }
  }
};

export const clearAllCompleted = () => {
  return {
    type: CLEAR_ALL_COMPLETED
  }
}