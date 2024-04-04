import { render, screen } from '@testing-library/react';
import AddItemPopup from './add-item-popup';
import { MockStore, mockCamera } from '../../../utils/mocks';
import { withHistory, withStore } from '../../../utils/mock-component';

describe('Component AddProductModal', () => {

  describe('should render correctly', () => {
    const focusElement = { current: document.createElement('button') };

    function onClose() {
      jest.fn();
    }

    const mockStore = MockStore();
    const { withStoreComponent } = withStore(<AddItemPopup camera={mockCamera} focusElement={focusElement} onClose={onClose} isCardItem={false}/>, mockStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    it('should render add button', () => {
      expect(screen.getByRole('button', { name: /добавить в корзину/i})).toBeInTheDocument();
    });

  });

});
