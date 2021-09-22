import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import { Container, PostContainer, PostTitle, PostData, PostDate, ErrMessage } from './ArticlePageStyle';
import { getOnePost } from '../../webAPI';
import Loading from '../../components/Loading';

const Post = ({ post }) => {
  const { title, createdAt, body } = post[0] || [];

  return (
    <PostContainer>
      <PostTitle>{title}</PostTitle>
      <PostDate>{new Date(createdAt).toLocaleString()}</PostDate>
      <PostData>{body}</PostData>
    </PostContainer>
  )
};

Post.propTypes = {
  post: PropTypes.array
};

const ArticlePage = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [errMessage, setErrmessage] = useState('');
  const isLoadingData = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      let data;
      try {
        data = await getOnePost(id);
        if (!data.length) {
          isLoadingData.current = false;
          setErrmessage('Somthing wrong～plaease try again！');
          return;
        }
      } catch (err) {
        isLoadingData.current = false;
        setErrmessage('Fail to fetch～plaease try again！');
        return;
      }
      setTimeout(() => {
        isLoadingData.current = false;
        setPost(() => data);
      }, 500);
    };
    fetchData();
  }, [id]);

  return (
    <Container>
      {isLoadingData.current && <Loading />}
      {errMessage && <ErrMessage>{errMessage}</ErrMessage>}
      {!errMessage && <Post post={post} />}
    </Container>
  )
};

export default ArticlePage;