import { render, screen } from '@testing-library/react';
import Pagination from './pagination';
import { withHistory } from '../../utils/mock-component';
import PaginationItem from './pagination-item';

describe('Component Pagination', () => {

  describe('should render correctly', () => {

    it('should render pagination', () => {
      function onPageClick() {
        jest.fn();
      }
      const preparedComponent = withHistory(<Pagination currentPage={1} totalItems={30} itemsPerPage={9} onPageClick={onPageClick} ></Pagination>);

      render(preparedComponent);

      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });

    it('should render pagination item', () => {
      function onPageClick() {
        jest.fn();
      }
      const preparedComponent = withHistory(<PaginationItem currentPage={1} onPageClick={onPageClick} number={1} ></PaginationItem>);

      render(preparedComponent);

      expect(screen.getByTestId('pagination-item')).toBeInTheDocument();
    });

  });

});
