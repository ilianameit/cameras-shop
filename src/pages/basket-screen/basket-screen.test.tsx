import { render, screen } from '@testing-library/react';
import BasketScreen from './basket-screen';
import { withHistory, withStore } from '../../utils/mock-component';
import { MockStore } from '../../utils/mocks';

describe('Component Basket', () => {

  describe('should render correctly', () => {
    const mockStore = MockStore();
    it('should render button basket', () => {
      const { withStoreComponent } = withStore(<BasketScreen />, mockStore);
      const preparedComponent = withHistory(withStoreComponent);
      render(preparedComponent);

      expect(screen.getByRole('button', { name: 'Оформить заказ' }));
    });

  });

});
