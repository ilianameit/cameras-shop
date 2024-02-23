import classNames from 'classnames';
import { memo } from 'react';
import { Link } from 'react-router-dom';

type PaginationItemProps = {
  number: number;
  onPageClick: (page: number) => void;
  currentPage: number;
}

function PaginationItemComponent({number, onPageClick, currentPage}: PaginationItemProps): JSX.Element {
  return(
    <li
      key={`${number}-page`}
      className="pagination__item"
      onClick={() => onPageClick(number)}
      data-testid='pagination-item'
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
  );
}

const PaginationItem = memo(PaginationItemComponent);
export default PaginationItem;
