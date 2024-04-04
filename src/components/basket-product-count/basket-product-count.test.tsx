import { render, screen } from '@testing-library/react';
import BasketProductCount from './basket-product-count';
import { mockCamerasBasket } from '../../utils/mocks';


describe('Component BasketProductCount', () => {
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

    const count = mockCamerasBasket[0].count;
    const id = mockCamerasBasket[0].id;

    it('should render Decrease button', () => {
      render(
        <BasketProductCount id={id} count={count} onIncreaseButtonClick={onIncreaseClick} onDecreaseButtonClick={onDecreaseClick} onCountChange={onCountChange}/>);

      expect(screen.getByRole('button', { name: /уменьшить количество товара/i })).toBeInTheDocument();
    });

    it('should render Increase button', () => {
      render(
        <BasketProductCount id={id} count={count} onIncreaseButtonClick={onIncreaseClick} onDecreaseButtonClick={onDecreaseClick} onCountChange={onCountChange}/>);

      expect(screen.getByRole('button', { name: /увеличить количество товара/i })).toBeInTheDocument();
    });

    it('should render input count', () => {
      render(
        <BasketProductCount id={id} count={count} onIncreaseButtonClick={onIncreaseClick} onDecreaseButtonClick={onDecreaseClick} onCountChange={onCountChange}/>);

      expect(screen.getByRole('spinbutton', {name: /количество товара/i})).toBeInTheDocument();
    });


  });
});
