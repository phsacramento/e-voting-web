import React, {PropTypes}                                     from 'react';

const Pagination = ({totalPages, curPage, nextPageFunc, prevPageFunc, setPageFunc}) => {

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
    <div className={'row ' + (pages.length < 2 && 'hidden')}>
      <div className="col-sm-12">
        <ul className="pagination">
          <li className="page-item">
            <button onClick={prevPageFunc} className="btn page-link" disabled={curPage === 1}>Anterior</button>
          </li>
          {pages.map(page => <li key={`page${page}`} className="page-item"><a href="#" name={page} onClick={setPageFunc} className={"page-link " + (page === curPage ? "selected" : "")}>{page}</a></li>)}
          <li className="page-item">
            <button onClick={nextPageFunc} className="btn page-link" disabled={curPage === totalPages}>Próximo</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  curPage: PropTypes.number.isRequired,
  nextPageFunc: PropTypes.func.isRequired,
  prevPageFunc: PropTypes.func.isRequired,
  setPageFunc: PropTypes.func.isRequired
};

export default Pagination;
