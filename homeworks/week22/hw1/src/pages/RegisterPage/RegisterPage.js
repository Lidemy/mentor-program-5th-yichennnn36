import React, { useState, useContext, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Container, Title, Form, InputItem, Button, ErrMessage } from '../../components/Form/FormStyle';
import { useHistory } from "react-router-dom";
import { register, getMe } from '../../webAPI';
import { setAuthToken } from '../../utils';
import { AuthContext } from '../../contexts';

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

export default RegisterPage;