import React, {PropTypes}                                       from 'react';

const PaginationItem = ({totalPages, curPage, setPageFunc}) => {

  let start = 1;
  let end = totalPages;

  let pages = [];

  if(end > 10)
    end = 10;

  if(curPage >= 8) {
    start = curPage - 5;
    end = curPage + 4;

    if(end > totalPages)
      end = totalPages;
  }
  
  for(let i = start; i <= end; i++)
    pages.push(i);

  return (
    {pages.map(page => <li key={`page${page}`} className="page-item"><a href="#" name={page} onClick={setPageFunc} className={"page-link " + (page === curPage ? "selected" : "")}>{page}</a></li>)}
  )
};

PaginationItem.propTypes = {
  totalPages: PropTypes.number.isRequired,
  curPage: PropTypes.number.isRequired,
  setPageFunc: PropTypes.func.isRequired
};

export default PaginationItem;
