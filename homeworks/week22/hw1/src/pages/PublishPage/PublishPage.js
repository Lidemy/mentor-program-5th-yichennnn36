import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import { Container, Title, Form, InputItem, PublishButton, ErrMessage } from './PublishPageStyle';
import { post } from '../../webAPI';
import { getMe } from '../../webAPI';

const PublishInput = ({ description, value, handleChange, handleClearMessag }) => {
  return (
    <InputItem>
      <div>{description}</div>
      <input onChange={handleChange} onBlur={handleClearMessag} value={value} />
    </InputItem>
  )
};

PublishInput.propTypes = {
  description: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  handleClearMessag: PropTypes.func
};

const PublishTextarea = ({ description, value, handleChange, handleClearMessag }) => {
  return (
    <InputItem>
      <div>{description}</div>
      <textarea value={value} onBlur={handleClearMessag} onChange={handleChange}></textarea>
    </InputItem>
  )
};

PublishTextarea.propTypes = {
  description: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  handleClearMessag: PropTypes.func
};


const PublishPage = () => {
  window.scrollTo(0, 0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const history = useHistory();

  // 登入權限管理
  const checkAuth = async () => {
    const response = await getMe();
    if (!response || response.ok === 0) return history.push("/");
  }
  checkAuth();

  const handlePublish = (e) => {
    e.preventDefault();

    const publishArticle = async () => {
      const data = await post(title, content);
      if (data.ok === 0) {
        return setErrMessage(() => data.message)
      }
      history.push("/");
    };
    publishArticle();
  }

  return (
    <Container>
      <Title>Publish an Article</Title>
      <Form onSubmit={handlePublish}>
        {errMessage && <ErrMessage>{errMessage}</ErrMessage>}
        <PublishInput
          description={'Title'}
          value={title}
          handleClearMessage={() => setErrMessage('')}
          handleChange={(e) => setTitle(e.target.value)}
        />

        <PublishTextarea
          description={'內文'}
          value={content}
          handleClearMessage={() => setErrMessage('')}
          handleChange={(e) => setContent(e.target.value)}
        />

        <div>
          <PublishButton>送出</PublishButton>
        </div>
      </Form>
    </Container>
  )
}

export default PublishPage;