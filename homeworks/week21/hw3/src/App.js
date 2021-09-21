import React from 'react';
import './App.css';
import styled from 'styled-components';
import { InputBlock, RadioBlock } from './components/InputBlock.js';
import useForm from './custom_hooks/useForm';

const Container = styled.div`
  background: white;
  max-width: 645px;
  margin: 50px auto;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  border-top: 10px solid ${props => props.theme.colors.primary};
  padding: 30px;
`;
const Header = styled.div`
  & h1 {
    font-size: ${props => props.theme.fontSize.fs_1};
    letter-spacing: 0.1rem;
    font-weight: bold;
  }
  & p {
    font-size: ${props => props.theme.fontSize.fs_6};
    margin: 8px 0;
  }
  & span {
    margin-bottom: 40px;
    color: ${props => props.theme.colors.alert};
    font-size: ${props => props.theme.fontSize.fs_6};
    font-weight: bold;
  }
`;
const QuestionSubmit = styled.div`
  margin-top: 60px;

  & button {
    width: 16%;
    background: ${props => props.theme.colors.primary};
    border: none;
    padding: 8px 24px;
    border-radius: 3px;
    cursor: pointer;
    font-size: ${props => props.theme.fontSize.fs_5};
  }
  & p {
    font-size: ${props => props.theme.fontSize.fs_6};
    font-weight: bold;
  }
`;
const Footer = styled.div`
  width: 100%;
  background: black;
  padding: 18px 0;
  color: #999999;
  font-size: ${props => props.theme.fontSize.fs_6};
  text-align: center;
  border-top: 2px solid ${props => props.theme.colors.primary};
`;

const App = () => {

  const {
    inputValue,
    handleInputChange,
    hasErr,
    handleCheckValid,
    isInValid,
    handleSubmit
  } = useForm();

  return (
    <div>
      <Container>
        <Header>
          <h1>新拖延運動報名表單</h1>
          <p>活動日期：2020/12/10 ~ 2020/12/11</p>
          <p>活動地點：台北市大安區新生南路二段1號</p>
          <span>* 必填</span>
        </Header>
        <form onSubmit={handleSubmit}>

          <InputBlock
            question={'暱稱'}
            type={'text'}
            name={'name'}
            placeholder={'您的回答'}
            value={inputValue.name}
            required={true}
            handleInputChange={handleInputChange}
            hasErr={hasErr}
            errMessage={['▲ 請輸入您的暱稱']}
          />

          <InputBlock
            question={'電子郵件'}
            type={'email'}
            name={'email'}
            placeholder={'您的電子郵件'}
            value={inputValue.email}
            required={true}
            handleInputChange={handleInputChange}
            handleCheckValid={handleCheckValid}
            hasErr={hasErr}
            isInValid={isInValid}
            errMessage={['▲ 請輸入您的電子郵件', '▲ 電子郵件不符合格式']}
          />

          <InputBlock
            question={'手機號碼'}
            type={'phone'}
            name={'phone'}
            placeholder={'您的手機號碼 (格式: 09xxxxxxxx)'}
            value={inputValue.phone}
            required={true}
            handleInputChange={handleInputChange}
            handleCheckValid={handleCheckValid}
            hasErr={hasErr}
            isInValid={isInValid}
            errMessage={['▲ 請輸入您的手機號碼', '▲ 手機號碼不符合格式']}
          />

          <RadioBlock
            question={'報名類型'}
            value={inputValue.entryType}
            handleInputChange={handleInputChange}
            checked={true}
            required={true}
            hasErr={hasErr}
            errMessage={['▲ 請選擇報名類型']}
          />

          <InputBlock
            question={'怎麼知道這個活動的？'}
            type={'text'}
            name={'referal'}
            placeholder={'您的回答'}
            value={inputValue.referal}
            required={true}
            handleInputChange={handleInputChange}
            hasErr={hasErr}
            errMessage={['▲ 請輸入您的回答']}
          />

          <InputBlock
            question={'其他，對活動的一些建議'}
            type={'text'}
            name={'suggestion'}
            placeholder={'您的回答'}
            value={inputValue.suggestion}
            required={false}
            handleInputChange={handleInputChange}
            hasErr={hasErr}
          />

          <QuestionSubmit>
            <button type="submit">送出</button>
            <p>請勿透過表單送出您的密碼。</p>
          </QuestionSubmit>

        </form>
      </Container>
      <Footer>
        © 2021 © Copyright. All rights Reserved.
      </Footer>
    </div>
  )
}

export default App;
