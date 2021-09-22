import React, { useState, useContext, useRef, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import { register, getMe } from '../../webAPI';
import { setAuthToken } from '../../utils';
import { AuthContext } from '../../contexts';
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

const RegisterInput = ({
  description,
  type,
  value,
  handleChange,
  handleClearMessage
}) => {
  return (
    <InputItem>
      <div>{description}</div>
      <input
        type={type}
        onChange={handleChange}
        value={value}
        onFocus={handleClearMessage}
      />
    </InputItem>
  )
};

RegisterInput.propTypes = {
  description: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  handleClearMessage: PropTypes.func
};

const RegisterPage = () => {
  const { setUser } = useContext(AuthContext);
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const history = useHistory();
  const isClick = useRef(true);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const fetchRegister = async () => {
      const data = await register(nickname, username, password);
      if (data.ok === 0) {
        return setErrMessage(data.message);
      }
      // 註冊成功
      setAuthToken(data.token);

      const response = await getMe();
      if (response.ok !== 1) {
        setAuthToken(null);
        return setErrMessage(() => response.toString());
      }
      setUser(response.data);
      history.push("/");
    };

    if (isClick.current) {
      isClick.current = false;
      fetchRegister();

      setTimeout(() => {
        isClick.current = true;
      }, 3000);
    }

  }, [isClick, history, nickname, password, setUser, username]);

  return (
    <Container>
      <Title>Register</Title>
      <Form onSubmit={handleSubmit}>
        <RegisterInput
          description={'Nickname'}
          value={nickname}
          handleClearMessage={() => setErrMessage('')}
          handleChange={(e) => setNickname(e.target.value)}
        />

        <RegisterInput
          description={'Username'}
          value={username}
          handleClearMessage={() => setErrMessage('')}
          handleChange={(e) => setUsername(e.target.value)}
        />

        <RegisterInput
          description={'Password'} type={'password'}
          value={password}
          handleClearMessage={() => setErrMessage('')}
          handleChange={(e) => setPassword(e.target.value)}
        />

        {errMessage && <ErrMessage>{errMessage}</ErrMessage>}
        <div>
          <Button>註冊</Button>
        </div>
      </Form>
    </Container>
  )
};

export { RegisterPage, Container, Title, Form, InputItem, Button, ErrMessage };