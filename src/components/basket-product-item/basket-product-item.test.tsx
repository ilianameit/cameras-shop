import { render, screen } from '@testing-library/react';
import { mockCamerasBasket } from '../../utils/mocks';
import BasketProductItem from './basket-product-item';

describe('Component BasketProductItem', () => {
  describe('should render correctly', () => {
    function onIncreaseClick() {
      jest.fn();
    }

    function onDecreaseClick() {
      jest.fn();
    }

    function onCountChange() {
      jest.fn();
    }

    function onRemoveClick() {
      jest.fn();
    }

    const camera = mockCamerasBasket[0];

    it('should render Общая цена camera', () => {
      render(
        <BasketProductItem camera={camera} onIncreaseButtonClick={onIncreaseClick} onDecreaseButtonClick={onDecreaseClick} onCountChange={onCountChange} onRemoveClick={onRemoveClick}/>);

      expect(screen.getByText(/Общая цена/i)).toBeInTheDocument();
    });

    it('should render remove button', () => {
      render(
        <BasketProductItem camera={camera} onIncreaseButtonClick={onIncreaseClick} onDecreaseButtonClick={onDecreaseClick} onCountChange={onCountChange} onRemoveClick={onRemoveClick}/>);

      expect(screen.getByRole('button', { name: /Удалить товар/i })).toBeInTheDocument();
    });

  });
});
