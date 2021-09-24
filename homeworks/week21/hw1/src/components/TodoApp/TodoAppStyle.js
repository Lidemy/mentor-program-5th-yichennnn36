import styled from 'styled-components';

const Container = styled.div`
  max-width: 650px;
  font-family: 'Baloo 2', sans-serif;
  margin: 50px auto;
  text-align: center;
  padding: 12px;
`;

const TodoTitle = styled.h1`
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

export { Container, TodoTitle, TodoInputBlock, TodoInput, InputButton, TodoItemBlock };
