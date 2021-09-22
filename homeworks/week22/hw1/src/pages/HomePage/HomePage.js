import React from 'react';
import PropTypes from 'prop-types';
import { Container, Title, PostTitle, PostDate, ErrMessage } from '../../components/Articles/ArticlesStyle';
import { PostLink, PostContainer, PostData } from './HomePageStyle';
import MemoPagination from '../../components/Pagination/Pagination';
import Loading from '../../components/Loading';
import usePosts from '../../custom_hooks/usePosts';

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