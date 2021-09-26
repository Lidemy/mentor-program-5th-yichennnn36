import styled from 'styled-components';
import { Link } from "react-router-dom";
import { MEDIA_QUERY_MD } from '../../style';

const PostLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.color.normal};
`;

const PostContainer = styled.div`
  margin-bottom: 40px;
  border-bottom: 1px solid ${props => props.theme.color.shadow};
`;

const PostData = styled.p`
  color: #353434;
  line-height: 24px;
  word-break: break-word;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; /* css3 新屬性 */
  /* 新增下列兩行 */
  -webkit-line-clamp: 5; /* 留幾行 */
  -webkit-box-orient: vertical;

  ${MEDIA_QUERY_MD} {
    line-height: 28px;
  }
`;

export { PostLink, PostContainer, PostData };