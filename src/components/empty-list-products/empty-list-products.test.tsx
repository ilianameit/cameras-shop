import { render, screen } from '@testing-library/react';
import EmptyListProducts from './empty-list-products';


describe('Component NotProducts', () => {

  describe('should render correctly', () => {

    it('should render not products text', () => {
      render(<EmptyListProducts />);

      expect(screen.getByText(/по вашему запросу ничего не найдено/i)).toBeInTheDocument();
    });

  });

});
