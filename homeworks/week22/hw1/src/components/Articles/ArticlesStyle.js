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
  margin-bottom: 60px;

  ${MEDIA_QUERY_MD} {
    font-size: ${props => props.theme.fontSize.fs_2};
  }
`;

const PostTitle = styled.div`
  font-family: ${props => props.theme.font.primary};
  font-size: ${props => props.theme.fontSize.fs_4};
  font-weight: 600;
  word-break: break-word;
  margin-bottom: 20px;

  ${MEDIA_QUERY_MD} {
    font-size: ${props => props.theme.fontSize.fs_3};
  }
`;

const PostDate = styled.span`
  font-size: ${props => props.theme.fontSize.fs_7};
  color: ${props => props.theme.color.secondary};
  font-family: ${props => props.theme.font.primary};

  ${MEDIA_QUERY_MD} {
    font-size: ${props => props.theme.fontSize.fs_6};
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

export { Container, Title, PostTitle, PostDate, ErrMessage };
