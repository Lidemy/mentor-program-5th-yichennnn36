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

const PostTitle = styled(Link)`
  color: ${props => props.theme.color.normal};
  text-decoration: none;
  font-size: ${props => props.theme.fontSize.fs_5};
  word-break: break-word;
  margin-bottom: 10px;
  

  ${MEDIA_QUERY_MD} {
    margin-bottom: 0;
    width: 600px;
  }
`;

const PostDate = styled.span`
  font-size: ${props => props.theme.fontSize.fs_6};
  color: ${props => props.theme.color.secondary};
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
    <PostContainer>
      <PostTitle to={`/article/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  )
};

Post.propTypes = {
  post: PropTypes.object
};

const ListPage = () => {
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
      <Title>Articles List</Title>
      {
        posts.map(post => <Post post={post} key={post.id} />)
      }
      {!errMessage && <MemoPagination page={page} fetchData={fetchData} />}
    </Container>
  )
}

export default ListPage;