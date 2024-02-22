import { render, screen } from '@testing-library/react';
import { MockStore } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import CatalogScreen from './catalog-screen';

describe('Component Catalog', () => {

  const mockStore = MockStore();

  describe('should render correctly', () => {

    it('should render title catalog', () => {
      const { withStoreComponent } = withStore(<CatalogScreen />, mockStore);
      const preparedComponent = withHistory(withStoreComponent);
      render(preparedComponent);

      expect(screen.getByText(/Каталог фото- и видеотехники/)).toBeInTheDocument();
    });

  });

});
