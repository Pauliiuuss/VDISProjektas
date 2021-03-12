import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  if (+pagesCount <= 2)
    return (
      <nav>
        <ul className="pagination justify-content-center">
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? 'page-item active' : 'page-item'
              }
            >
              <button className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  else
    return (
      <nav>
        <ul className="pagination justify-content-center">
          {currentPage !== 1 && (
            <>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => onPageChange(currentPage - 1)}
                >
                  Ankstesnis
                </button>
              </li>
              {currentPage > 2 && (
                <li
                  key="lastPage"
                  className={
                    1 === currentPage ? 'page-item active' : 'page-item'
                  }
                >
                  <button className="page-link" onClick={() => onPageChange(1)}>
                    {1}
                  </button>
                </li>
              )}
            </>
          )}
          {currentPage >= 4 && (
            <li className="page-item disabled" hidden={currentPage < 4}>
              <p className="page-link">...</p>
            </li>
          )}
          {pages
            .filter((p) => p > currentPage - 2 && p < currentPage + 2)
            .map((page) => (
              <li
                key={page}
                className={
                  page === currentPage ? 'page-item active' : 'page-item'
                }
              >
                <button
                  className="page-link"
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              </li>
            ))}
          {+pagesCount - +currentPage > 2 && (
            <li className="page-item disabled">
              <p className="page-link">...</p>
            </li>
          )}
          {+pagesCount - +currentPage >= 2 && (
            <li
              key="lastPage"
              className={
                pagesCount === currentPage ? 'page-item active' : 'page-item'
              }
            >
              <button
                className="page-link"
                onClick={() => onPageChange(pagesCount)}
              >
                {pagesCount}
              </button>
            </li>
          )}
          {pagesCount !== currentPage && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => onPageChange(currentPage + 1)}
              >
                Sekantis
              </button>
            </li>
          )}
        </ul>
      </nav>
    );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
