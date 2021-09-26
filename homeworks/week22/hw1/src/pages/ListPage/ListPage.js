import React from 'react';
import PropTypes from 'prop-types';
import { Container, Title, PostTitle, PostDate, ErrMessage } from '../../components/Articles/ArticlesStyle';
import PostContainer from './ListPageStyle';
import MemoPagination from '../../components/Pagination/Pagination';
import Loading from '../../components/Loading';
import usePosts from '../../customHooks/usePosts';

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