import { render, screen } from '@testing-library/react';
import AddItemPopup from './add-item-popup';
import { mockCamera } from '../../../utils/mocks';

describe('Component AddProductModal', () => {

  describe('should render correctly', () => {
    it('should render add button', () => {
      render(<AddItemPopup camera={mockCamera}/>);

      expect(screen.getByRole('button', { name: /добавить в корзину/i})).toBeInTheDocument();
    });

    it('should render product details', () => {
      render(<AddItemPopup camera={mockCamera}/>);

      expect(screen.getByText(/артикул/i)).toBeInTheDocument();
      expect(screen.getByText(/цена/i)).toBeInTheDocument();
    });

  });

});
