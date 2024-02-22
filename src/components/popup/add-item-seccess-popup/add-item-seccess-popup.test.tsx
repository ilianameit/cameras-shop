import { render, screen } from '@testing-library/react';
import AddItemSeccessPopup from './add-item-seccess-popup';

describe('Component AddProductModal seccess', () => {

  describe('should render correctly', () => {

    it('should render title', () => {
      render(<AddItemSeccessPopup/>);

      expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
      expect(screen.getByTestId('close-button')).toBeInTheDocument();
    });


    it('should render product details', () => {
      render(<AddItemSeccessPopup/>);

      expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();
    });

  });

});
