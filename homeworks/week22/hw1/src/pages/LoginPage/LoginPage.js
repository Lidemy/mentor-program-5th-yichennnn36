import React, { useState, useContext, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import { Container, Title, Form, InputItem, Button, ErrMessage } from '../../components/Form/FormStyle';
import { login, getMe } from '../../webAPI';
import { setAuthToken } from '../../utils';
import { AuthContext } from '../../contexts';

const LoginInput = ({
  description,
  type,
  value,
  handleChange,
  handleClearMessage
}) => {
  return (
    <InputItem>
      <div>{description}</div>
      <input type={type} onChange={handleChange} onFocus={handleClearMessage} value={value} />
    </InputItem>
  )
};

LoginInput.propTypes = {
  description: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  handleClearMessage: PropTypes.func
};

const LoginPage = () => {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const history = useHistory();

  const isClick = useRef(true);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const fetchLogin = async () => {
      const data = await login(username, password);

      if (data.ok === 0) {
        return setErrMessage(() => data.message);
      }
      setAuthToken(data.token);

      const response = await getMe();
      if (response.ok !== 1) {
        // 有 token，但沒有登入成功就清掉
        setAuthToken(null);
        return setErrMessage(() => response.toString());
      }
      setUser(response.data);
      history.push("/");
    };

    if (isClick.current) {
      isClick.current = false;
      fetchLogin();

      setTimeout(() => {
        isClick.current = true;
      }, 3000);
    }
  }, [isClick, history, password, setUser, username]);

  return (
    <Container>
      <Title>Login in</Title>
      <Form onSubmit={handleSubmit}>
        <LoginInput
          description={'Username'}
          value={username}
          handleClearMessage={() => setErrMessage('')}
          handleChange={(e) => setUsername(e.target.value)}
        />

        <LoginInput
          description={'Password'} type={'password'}
          value={password}
          handleClearMessage={() => setErrMessage('')}
          handleChange={(e) => setPassword(e.target.value)}
        />

        {errMessage && <ErrMessage>{errMessage}</ErrMessage>}
        <div>
          <Button>登入</Button>
        </div>
      </Form>
    </Container>
  )
}

export default LoginPage;