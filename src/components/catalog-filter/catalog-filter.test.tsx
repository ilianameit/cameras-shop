import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';
import CatalogFilter from './catalog-filter';

describe('Component CatalogFilter', () => {

  describe('should render correctly', () => {

    function onFilterChange() {
      jest.fn();
    }

    function onResetFilterClick() {
      jest.fn();
    }

    function onFilterChangeKeyDown() {
      jest.fn();
    }

    function onChangeFilterPrice() {
      jest.fn();
    }

    function onChangeSetFilterPriceValue() {
      jest.fn();
    }

    const { withStoreComponent } = withStore(
      <CatalogFilter
        onFilterChange={onFilterChange}
        onFilterChangeKeyDown={onFilterChangeKeyDown}
        onResetFilterClick={onResetFilterClick}
        filterCategory={'Видеокамера'}
        filterType={'Коллекционная'}
        filterLevel={''}
        filterPriceValue={{
          from: 0,
          to: 0
        }}
        onChangeFilterPrice={onChangeFilterPrice}
        initialFilterPrice={{
          from: 2000,
          to: 70000
        }}
        onChangeSetFilterPriceValue={onChangeSetFilterPriceValue}
      />
    );

    render(withStoreComponent);

    it('should render categories of filter', () => {
      expect(screen.getByText(/категория/i)).toBeInTheDocument();
      expect(screen.getByText(/тип камеры/i)).toBeInTheDocument();
      expect(screen.getByText(/уровень/i)).toBeInTheDocument();
    });

    it('should render reset button', () => {
      expect(screen.getByRole('button', { name: /Сбросить фильтры/i})).toBeInTheDocument();
    });
  });

});
