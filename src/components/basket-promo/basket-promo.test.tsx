import { render, screen } from '@testing-library/react';
import { MockStore } from '../../utils/mocks';
import BasketPromo from './basket-promo';
import { withHistory, withStore } from '../../utils/mock-component';

describe('Component BasketPromo', () => {

  const mockStore = MockStore();
  it('should render "Промокод"', () => {
    const { withStoreComponent } = withStore(<BasketPromo />, mockStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const promocodes = screen.getAllByText(/Промокод/i);
    expect(promocodes).toHaveLength(2);
  });

  it('should render input for promocode', () => {
    const { withStoreComponent } = withStore(<BasketPromo />, mockStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByLabelText(/промокод/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/введите промокод/i)).toBeInTheDocument();
  });

});
