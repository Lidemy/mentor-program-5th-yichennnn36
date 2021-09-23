import { useState, useEffect, useCallback, useRef } from 'react';
import { getPosts } from '../webAPI';

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState({
    currentPage: 1,
    diff: 2,
    totalPage: 1
  });
  const [errMessage, setErrMessage] = useState('');
  const isLoadingData = useRef(true);
  const offset = 5;

  const fetchData = useCallback((currentPage) => {
    const fetchingData = async () => {
      let data, count;
      try {
        [count, data] = await getPosts(currentPage, offset);
        if (!data.length) {
          isLoadingData.current = false;
          setErrMessage('Somthing wrong～plaease try again！');
          return;
        }
      } catch (err) {
        isLoadingData.current = false;
        setErrMessage('Fail to fetch～plaease try again！');
        return;
      }
      const totalPage = Math.ceil(count / 5);
      setTimeout(() => {
        isLoadingData.current = false;
        setPosts(() => data);
        setPage(page => ({
          ...page,
          currentPage,
          totalPage
        }));
      }, 500);
    };
    fetchingData();
  }, []);


  useEffect(() => {
    fetchData(page.currentPage);
  }, [page.currentPage, fetchData]);

  return {
    isLoadingData,
    errMessage,
    posts,
    page,
    fetchData
  }
};

export default usePosts;