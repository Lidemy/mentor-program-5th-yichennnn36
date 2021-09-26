import styled from 'styled-components';
import { MEDIA_QUERY_MD } from '../../style';

const PostContainer = styled.div`
  margin-bottom: 40px;
  border-bottom: 1px solid ${props => props.theme.color.shadow};
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;

  ${MEDIA_QUERY_MD} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export default PostContainer;