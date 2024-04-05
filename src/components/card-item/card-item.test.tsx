import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import CardItem from './card-item';
import { MockStore, mockCamera } from '../../utils/mocks';
import { NameSpace } from '../../const/const';

describe('Component CardItem', () => {
  function onBuyClick() {
    jest.fn();
  }

  describe('should render correctly', () => {

    it('should render buy button if camera isnt in the basket', () => {
      const { withStoreComponent } = withStore(<CardItem camera={mockCamera} onBuyClick={onBuyClick}/>, MockStore());
      const preparedComponent = withHistory(withStoreComponent);
      render(preparedComponent);

      expect(screen.getByRole('button', { name: /купить/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /подробнее/i })).toBeInTheDocument();
    });

    it('should render в корзину if camera in the basket', () => {
      const { withStoreComponent } = withStore(<CardItem camera={mockCamera} onBuyClick={onBuyClick}/>, MockStore({[NameSpace.Basket]: {
        cart: [{...mockCamera, count: 1}],
        isSuccessAddToCart: false,
        isCreateOrderSuccess: false,
        isCreateOrderFail: false,
        promocode: {
          coupon: null,
          discount: 0,
        },
        isDiscountLoading: false,
        invalidCoupon: false,
      }}));
      const preparedComponent = withHistory(withStoreComponent);
      render(preparedComponent);

      expect(screen.getByRole('link', { name: /В корзине/i })).toBeInTheDocument();
    });

    it('should render product details', () => {
      const { withStoreComponent } = withStore(<CardItem camera={mockCamera} onBuyClick={onBuyClick}/>, MockStore());
      const preparedComponent = withHistory(withStoreComponent);
      render(preparedComponent);

      expect(screen.getByText(/рейтинг/i)).toBeInTheDocument();
      expect(screen.getByText(/всего оценок/i)).toBeInTheDocument();
      expect(screen.getByText(/цена/i)).toBeInTheDocument();
    });

  });

});
