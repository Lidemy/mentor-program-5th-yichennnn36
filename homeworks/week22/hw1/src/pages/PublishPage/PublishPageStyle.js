import styled from 'styled-components';
import { MEDIA_QUERY_MD } from '../../style';

const Container = styled.div`
  min-width: 300px;
  margin: 140px auto 20px;
  padding: 20px;
  position: relative;

  ${MEDIA_QUERY_MD} {
    max-width: 800px;
    margin: 180px auto 20px;
  }
`;

const Title = styled.div`
  font-family: ${props => props.theme.font.secondary};
  font-size: ${props => props.theme.fontSize.fs_3};
  font-weight: 600;
  letter-spacing: 2px;
  margin-bottom: 40px;

  ${MEDIA_QUERY_MD} {
    font-size: ${props => props.theme.fontSize.fs_2};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 10px;

  & div:last-child {
    text-align: right;
    margin-top: 20px;
  }
`;

const InputItem = styled.div`
  margin-bottom: 30px;
  font-size: ${props => props.theme.fontSize.fs_5};
  font-family: ${props => props.theme.font.primary};

  ${MEDIA_QUERY_MD} {
    display: flex;
    align-items: flex-start;
  }

  & div {
    margin-bottom: 10px;
    color: ${props => props.theme.color.primary};

    ${MEDIA_QUERY_MD} {
      width: 70px;
      padding-top: 4px;
      margin-bottom: 0;
    }
  }
  & input {
    font-size: ${props => props.theme.fontSize.fs_5};
    height: 30px;
    width: 100%;
    border: 2px solid ${props => props.theme.color.secondary};
    border-radius: 12px;
    outline: none;
    padding: 6px;
  }
  & textarea {
    font-size: ${props => props.theme.fontSize.fs_5};
    font-family: ${props => props.theme.font.primary};
    width: 100%;
    height: 360px;
    border: 2px solid ${props => props.theme.color.secondary};
    border-radius: 12px;
    outline: none;
    padding: 6px;
  }
`;

const PublishButton = styled.button`
  background: ${props => props.theme.color.normal};
  color: white;
  font-size: ${props => props.theme.fontSize.fs_6};
  padding: 10px 20px;
  border: 1px solid ${props => props.theme.color.normal};
  border-radius: 20px;
  cursor: pointer;
`;

const ErrMessage = styled.div`
  color: ${props => props.theme.color.alert};
  font-weight: bold;
  position: absolute;
  left: 10px;
  top: -50px;

  &::before {
    content: '!! ';
    font-size: ${props => props.theme.fontSize.fs_4};
  }
`;

export { Container, Title, Form, InputItem, PublishButton, ErrMessage };