import { memo, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PaginationItem from './pagination-item';

type PaginationProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageClick: (page: number) => void;
}

const MAX_PAGES_ON_SCREEN = 3;
function PaginationComponent({currentPage, totalItems, itemsPerPage, onPageClick}: PaginationProps): JSX.Element {

  const pagesTotal = useMemo(() => Math.ceil(totalItems / itemsPerPage), [itemsPerPage, totalItems]);
  const paginationCount = useMemo(() => Math.ceil(pagesTotal / MAX_PAGES_ON_SCREEN), [pagesTotal]);
  const currentGroupPagination = useMemo(() => Math.ceil(currentPage / MAX_PAGES_ON_SCREEN), [currentPage]);
  const [currentPagination, setCurrentPagination] = useState(currentGroupPagination);
  useEffect(() => {
    setCurrentPagination(currentGroupPagination);
  }, [currentGroupPagination]);
  const startNumber = useMemo(() => currentPagination * MAX_PAGES_ON_SCREEN - MAX_PAGES_ON_SCREEN + 1, [currentPagination]);
  const endNumber = currentPagination < paginationCount ? startNumber + MAX_PAGES_ON_SCREEN : pagesTotal + 1;
  const pageNumbers = useMemo(() => {
    const pages = [];
    for(let i = startNumber; i < endNumber; i++){
      pages.push(i);
    }
    return pages;
  }, [endNumber, startNumber]);


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
      <ul className="pagination__list" data-testid='pagination'>
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
            <PaginationItem key={`page-${number}`} number={number} onPageClick={onPageClick} currentPage={currentPage} />
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

const Pagination = memo(PaginationComponent);
export default Pagination;
