import { render, screen } from '@testing-library/react';
import AddItemPopup from './add-item-popup';

describe('Component AddProductModal', () => {

  describe('should render correctly', () => {
    function onClose() {
      jest.fn();
    }

    it('should render add button', () => {
      render(<AddItemPopup onClose={onClose} />);

      expect(screen.getByRole('button', { name: /добавить в корзину/i})).toBeInTheDocument();
    });

    it('should render product details', () => {
      render(<AddItemPopup onClose={onClose} />);

      expect(screen.getByText(/артикул/i)).toBeInTheDocument();
      expect(screen.getByText(/цена/i)).toBeInTheDocument();
    });

  });

});
