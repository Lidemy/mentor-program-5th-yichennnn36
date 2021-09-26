import styled from 'styled-components';
import { MEDIA_QUERY_MD } from '../../style';

const Container = styled.div`
  max-width: 360px;
  margin: 140px auto 20px;
  padding: 20px;

  ${MEDIA_QUERY_MD} {
    max-width: 400px;
    margin: 180px auto 20px;
  }
`;

const Title = styled.div`
  font-family: ${props => props.theme.font.secondary};
  font-size: ${props => props.theme.fontSize.fs_2};
  font-weight: 600;
  letter-spacing: 2px;
  margin-bottom: 40px;

  ${MEDIA_QUERY_MD} {
    font-size: ${props => props.theme.fontSize.fs_1};
  }
`;

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;

  & div:last-child {
    text-align: right;
    margin-top: 50px;
  }
`;

const InputItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
  font-family: 'Comfortaa', sans-serif;
  font-size: ${props => props.theme.fontSize.fs_6};

  & div {
    flex: none;
    width: 100px;
    padding: 0 10px;
  }
  & input {
    font-size: ${props => props.theme.fontSize.fs_4};
    height: 30px;
    border: transparent;
    border-bottom: 2px solid black;
    padding-left: 10px;
    outline: transparent;
    font-family: 'Comfortaa', sans-serif;
    width: 100%;
  }
`;

const Button = styled.button`
  background: ${props => props.theme.color.normal};
  color: white;
  font-size: ${props => props.theme.fontSize.fs_6};
  padding: 10px 20px;
  border: 1px solid black;
  border-radius: 20px;
  cursor: pointer;
`;

const ErrMessage = styled.div`
  color: ${props => props.theme.color.alert};
  font-weight: bold;
  position: absolute;
  left: 10px;
  bottom: 46px;

  &::before {
    content: '!! ';
    font-size: ${props => props.theme.fontSize.fs_4};
  }
`;

export { Container, Title, Form, InputItem, Button, ErrMessage };