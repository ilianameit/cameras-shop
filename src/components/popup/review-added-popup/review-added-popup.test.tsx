import { render, screen } from '@testing-library/react';
import ReviewAddedPopup from './review-added-popup';
import { withHistory } from '../../../utils/mock-component';


describe('Component Review Added Modal Seccess', () => {
  function onClose() {
    jest.fn();
  }

  describe('should render correctly', () => {
    const preparedComponent = withHistory(<ReviewAddedPopup onClose={onClose}/>);

    it('should render header', () => {
      render(preparedComponent);

      expect(screen.getByText(/Спасибо за отзыв/i)).toBeInTheDocument();
    });

    it('should render details', () => {
      render(preparedComponent);

      expect(screen.getByRole('button', { name: /Вернуться к покупкам/i})).toBeInTheDocument();
    });

  });

});

