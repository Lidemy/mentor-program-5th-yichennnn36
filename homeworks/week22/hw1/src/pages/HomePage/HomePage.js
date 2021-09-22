import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import MemoPagination from '../../components/Pagination/Pagination';
import Loading from '../../components/Loading';
import usePosts from '../../custom_hooks/usePosts';
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

const PostLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.color.normal};
`;

const PostContainer = styled.div`
  margin-bottom: 40px;
  border-bottom: 1px solid ${props => props.theme.color.shadow};
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

const ErrMessage = styled.div`
  color: ${props => props.theme.color.alert};
  font-size: ${props => props.theme.fontSize.fs_5};
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
`;

const Post = ({ post }) => {
  return (
    <PostLink to={`/article/${post.id}`}>
      <PostContainer>
        <PostTitle>{post.title}</PostTitle>
        <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
        <PostData>{post.body}</PostData>
      </PostContainer>
    </PostLink>
  )
};

Post.propTypes = {
  post: PropTypes.object
};

const HomePage = () => {
  window.scrollTo(0, 0);
  const {
    isLoadingData,
    errMessage,
    posts,
    page,
    fetchData
  } = usePosts();

  return (
    <Container>
      {isLoadingData.current && <Loading />}
      {errMessage && <ErrMessage>{errMessage}</ErrMessage>}
      <Title>Latest Articles</Title>
      {
        posts.map((post) => (<Post key={post.id} post={post} />))
      }
      {!errMessage && <MemoPagination page={page} fetchData={fetchData} />}
    </Container>
  )
};

export default HomePage;