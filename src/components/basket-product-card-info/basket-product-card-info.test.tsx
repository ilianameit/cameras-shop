import { render, screen } from '@testing-library/react';
import { mockCamera } from '../../utils/mocks';
import BasketProductCardInfo from './basket-product-card-info';


describe('Component BasketProductCardInfo', () => {
  describe('should render correctly', () => {

    const camera = mockCamera;
    it('should render Цена; when screenType=addItem', () => {
      render(
        <BasketProductCardInfo camera={camera} screenType='addItem'/>
      );

      expect(screen.getByText(/Цена/)).toBeInTheDocument();
    });

    it('should render Цена; when screenType=basket', () => {
      render(
        <BasketProductCardInfo camera={camera} screenType='basket'/>
      );

      expect(screen.getByText(/Цена/)).toBeInTheDocument();

    });

    it('shouldnt render Цена; when screenType=removeItem', () => {
      render(
        <BasketProductCardInfo camera={camera} screenType='removeItem'/>
      );

      expect(screen.queryByText(/Цена/)).toBeNull();
    });


  });
});
