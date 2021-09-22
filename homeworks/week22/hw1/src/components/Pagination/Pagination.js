import React, { memo, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PaginationBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  font-family: 'Comfortaa', sans-serif;
  color: grey;
`;

const PageCode = styled.li`
  list-style: none;
  cursor: pointer;

  ${props => props.$status === "nomore" && `color: white`};
  ${props => props.$status === "activePage" && `color: black; font-size: 20px;`};

  & + & {
    margin-left: 20px;
  }
`;

const Pagination = ({
  page,
  fetchData
}) => {

  const prePageHandeler = () => {
    let { currentPage } = page;

    if (--currentPage === 0) return false;
    pageClick(currentPage);
  }

  const nextPageHandeler = () => {
    let { currentPage, totalPage } = page;

    if (currentPage > totalPage) return false;
    ++currentPage;
    pageClick(currentPage);
  }

  const pageClick = useCallback((currentPage) => {
    fetchData(currentPage);
  }, [fetchData]);

  const creatPagination = () => {
    const { currentPage, diff, totalPage } = page;
    let pages = [];

    // 前一頁按鈕
    pages.push(
      <PageCode key={0} $status={currentPage === 1 ? "nomore" : null}
        onClick={prePageHandeler}
      >
        ＜
      </PageCode>
    );
    // 第一種情況
    // 總頁數不超過十頁就全印
    if (totalPage <= 10) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(
          <PageCode key={i} $status={currentPage === i ? "activePage" : null}
            onClick={() => fetchData(i)}
          >
            {i}
          </PageCode>
        );
      }
    } else {
      // 超過十頁
      // 第一頁
      pages.push(
        <PageCode key={1} $status={currentPage === 1 ? "activePage" : null}
          onClick={() => fetchData(1)}
        >
          1
        </PageCode>
      );
      // part 1
      if (currentPage - diff > diff) {
        // 前省略號
        pages.push(<PageCode key={-1}>···</PageCode>);
      }
      // 第一種情況
      if (currentPage - diff <= diff) {
        for (let i = 2; i <= 5; i++) {
          pages.push(
            <PageCode key={i} $status={currentPage === i ? "activePage" : null}
              onClick={() => fetchData(i)}
            >
              {i}
            </PageCode>
          );
        }
      } else if (currentPage + diff > totalPage - diff) {
        // 第二種情況
        for (let i = totalPage - 5 + 1; i < totalPage; i++) {
          pages.push(
            <PageCode key={i} $status={currentPage === i ? "activePage" : null}
              onClick={() => fetchData(i)}
            >
              {i}
            </PageCode>
          );
        }
      } else {
        // 最後一種情況
        for (let i = currentPage - diff; i <= currentPage + diff; i++) {
          pages.push(
            <PageCode key={i} $status={currentPage === i ? "activePage" : null}
              onClick={() => fetchData(i)}
            >
              {i}
            </PageCode>
          );
        }
      }
      // 後省略號
      if (currentPage + diff <= totalPage - diff) {
        pages.push(<PageCode key={-2}>···</PageCode>);
      }
      // 最後一頁
      pages.push(
        <PageCode key={totalPage} $status={currentPage === totalPage ? "activePage" : null}
          onClick={() => fetchData(totalPage)}
        >
          {totalPage}
        </PageCode>
      );
      pages.push(
        <PageCode key={totalPage + 1} $status={currentPage === totalPage ? "nomore" : null}
          onClick={nextPageHandeler}
        >
          ＞
        </PageCode>
      );
    }
    return pages;
  }

  return (
    <PaginationBlock>
      {creatPagination()}
    </PaginationBlock>
  )
};

Pagination.propTypes = {
  page: PropTypes.object,
  fetchData: PropTypes.func
};

const MemoPagination = memo(Pagination);

export default MemoPagination;