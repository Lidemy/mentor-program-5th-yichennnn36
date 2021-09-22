import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import { getOnePost } from '../../webAPI';
import Loading from '../../components/Loading';
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