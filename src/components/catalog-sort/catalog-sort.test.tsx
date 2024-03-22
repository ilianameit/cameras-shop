import { withStore } from '../../utils/mock-component';
import { MockStore } from '../../utils/mocks';
import CatalogSort from './catalog-sort';
import { render, screen } from '@testing-library/react';
import { sortType } from '../../const/const';

describe('Component CatalogSort', () => {

  const mockStore = MockStore();

  describe('should render correctly', () => {

    it('should render labels', () => {

      function onSortTypeNameChange() {
        jest.fn();
      }

      function onSortTypeByChange() {
        jest.fn();
      }

      const { withStoreComponent } = withStore(
        <CatalogSort
          sortTypeName={'sortPrice'}
          onSortTypeNameChange={onSortTypeNameChange}
          sortTypeBy={'up'}
          onSortTypeByChange={onSortTypeByChange}
        />, mockStore);

      render(withStoreComponent);

      expect(screen.getByText(`по ${sortType.sortPrice}`)).toBeInTheDocument();
      expect(screen.getByText(`по ${sortType.sortPopular}`)).toBeInTheDocument();
    });

  });

});
