import styled from 'styled-components';
import { MEDIA_QUERY_MD } from '../../style';

const Container = styled.div`
  max-width: 800px;
  margin: 140px auto 60px;
  padding: 20px;
  position: relative;

  ${MEDIA_QUERY_MD} {
    margin: 180px auto 20px;
  }
`;

const PostContainer = styled.div`
  padding-bottom: 10px;
`;

const PostTitle = styled.div`
  font-family: ${props => props.theme.font.primary};
  font-size: ${props => props.theme.fontSize.fs_3};
  font-weight: 600;
  word-break: break-word;
  margin-bottom: 20px;

  ${MEDIA_QUERY_MD} {
    font-size: ${props => props.theme.fontSize.fs_2};
  }
`;

const PostDate = styled.span`
  font-size: ${props => props.theme.fontSize.fs_6};
  color: ${props => props.theme.color.secondary};
  font-family: ${props => props.theme.font.primary};
`;

const PostData = styled.p`
  margin-top: 50px;
  line-height: 24px;
  word-break: break-word;
  white-space: pre-wrap;

  ${MEDIA_QUERY_MD} {
    line-height: 28px;
  }
`;

const ErrMessage = styled.div`
  color: ${props => props.theme.color.alert};
  font-size: ${props => props.theme.fontSize.fs_5};
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
`;

export { Container, PostContainer, PostTitle, PostData, PostDate, ErrMessage };