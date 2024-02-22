import { render, screen } from '@testing-library/react';

import Header from './header';
import { withStore, withHistory } from '../../utils/mock-component';
import { MockStore } from '../../utils/mocks';

describe('Component Header', () => {

  const mockStore = MockStore();

  beforeEach(() => {
    const { withStoreComponent } = withStore(<Header />, mockStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
  });

  describe('should render correctly', () => {

    it ('should render logo link', () => {
      expect(screen.getByRole('link', { name: /Переход на главную/i })).toBeInTheDocument();
    });

    it('should render basket link', () => {
      expect(screen.getByRole('link', { name: /Корзина/i })).toBeInTheDocument();
    });

    it('should render menu links', () => {
      expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
      expect(screen.getByText(/Гарантии/i)).toBeInTheDocument();
      expect(screen.getByText(/Доставка/i)).toBeInTheDocument();
      expect(screen.getByText(/О компании/i)).toBeInTheDocument();
    });

  });

});
