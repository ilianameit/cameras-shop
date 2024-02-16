import classNames from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type PaginationProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageClick: (page: number) => void;
}

const MAX_PAGES_ON_SCREEN = 3;
function Pagination({currentPage, totalItems, itemsPerPage, onPageClick}: PaginationProps): JSX.Element {
  const pagesTotal = Math.ceil(totalItems / itemsPerPage);
  const paginationCount = Math.ceil(pagesTotal / MAX_PAGES_ON_SCREEN);
  const [currentPagination, setCurrentPagination] = useState(Math.ceil(currentPage / MAX_PAGES_ON_SCREEN));
  const startNumber = currentPagination * MAX_PAGES_ON_SCREEN - MAX_PAGES_ON_SCREEN + 1;
  const endNumber = currentPagination < paginationCount ? startNumber + MAX_PAGES_ON_SCREEN : pagesTotal + 1;
  const pageNumbers: number[] = [];

  for(let i = startNumber; i < endNumber; i++){
    pageNumbers.push(i);
  }

  function handlePaginateBackClick() {
    if(currentPage <= pagesTotal){
      setCurrentPagination((prevCurrentPagination) => prevCurrentPagination - 1);
      onPageClick(pageNumbers[0] - 1);
      return;
    }
    setCurrentPagination(paginationCount);
    onPageClick(pagesTotal);
  }

  function handlePaginateNextClick() {
    setCurrentPagination((prevCurrentPagination) => prevCurrentPagination + 1);
    onPageClick(pageNumbers.slice(-1)[0] + 1);
  }

  return(
    <div className="pagination">
      <ul className="pagination__list">
        {
          currentPage > MAX_PAGES_ON_SCREEN && (
            <li
              className="pagination__item"
              onClick={handlePaginateBackClick}
            >
              <Link
                className="pagination__link pagination__link--text"
                to=''
              >
                Назад
              </Link>
            </li>
          )
        }
        {
          pageNumbers.map((number) => (
            <li
              key={`${number}-page`}
              className="pagination__item"
              onClick={() => onPageClick(number)}
            >
              <Link
                className={
                  classNames(
                    'pagination__link',
                    {'pagination__link--active': currentPage === number}
                  )
                }
                to=''
              >
                {number}
              </Link>
            </li>
          ))
        }
        {
          currentPagination < paginationCount && (
            <li
              className="pagination__item"
              onClick={handlePaginateNextClick}
            >
              <Link
                className="pagination__link pagination__link--text" to=''
              >
                Далее
              </Link>
            </li>
          )
        }
      </ul>
    </div>
  );
}

export default Pagination;
