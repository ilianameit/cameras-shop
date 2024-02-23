import { render, screen } from '@testing-library/react';
import RemoveItemPopup from './remove-item-popup';

describe('Component Remove Item Modal', () => {

  describe('should render correctly', () => {

    it('should render header', () => {
      render(<RemoveItemPopup/>);

      expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();
    });

    it('should render details', () => {
      render(<RemoveItemPopup/>);

      expect(screen.getByRole('link', { name: /продолжить покупки/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Удалить/i})).toBeInTheDocument();
    });

  });

});
