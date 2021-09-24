import styled from 'styled-components';

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

export { TodoBlock, Todo, TodoCheck, TodoEditInput, TodoFunctionButton };
