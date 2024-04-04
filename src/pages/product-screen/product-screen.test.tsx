import { render, screen } from '@testing-library/react';
import { MockStore } from '../../utils/mocks';
import ProductScreen from './product-screen';
import { withHistory, withStore } from '../../utils/mock-component';

describe('Component Product', () => {

  const mockStore = MockStore();

  describe('should render correctly', () => {

    it('should render add basket button', () => {
      const { withStoreComponent } = withStore(<ProductScreen />, mockStore);
      const preparedComponent = withHistory(withStoreComponent);

      render(preparedComponent);

      expect(screen.queryByRole('button')).toBeInTheDocument();
    });

  });

});
