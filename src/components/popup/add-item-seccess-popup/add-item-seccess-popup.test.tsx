import { render, screen } from '@testing-library/react';
import AddItemSeccessPopup from './add-item-seccess-popup';
import { MockStore } from '../../../utils/mocks';
import { withHistory, withStore } from '../../../utils/mock-component';

describe('Component AddProductModal seccess', () => {

  describe('should render correctly', () => {
    const focusElement = { current: document.createElement('a') };
    function onContinueButtonClick() {
      jest.fn();
    }

    const mockStore = MockStore();
    it('should render button продолжить покупки', () => {
      const { withStoreComponent } = withStore(<AddItemSeccessPopup focusElement={focusElement} onContinueButtonClick={onContinueButtonClick} isCardItem={false}/>, mockStore);
      const preparedComponent = withHistory(withStoreComponent);

      render(preparedComponent);

      expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();
    });


    it('should render button перейти в корзину', () => {
      const { withStoreComponent } = withStore(<AddItemSeccessPopup focusElement={focusElement} onContinueButtonClick={onContinueButtonClick} isCardItem={false}/>, mockStore);
      const preparedComponent = withHistory(withStoreComponent);

      render(preparedComponent);


      expect(screen.getByRole('button', { name: /Перейти в корзину/i})).toBeInTheDocument();
    });

  });

});
