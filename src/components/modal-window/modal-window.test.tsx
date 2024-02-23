import { render, screen } from '@testing-library/react';
import ModalWindow from './modal-window';
import { MockStore } from '../../utils/mocks';
import { withStore } from '../../utils/mock-component';

describe('Component Modal', () => {

  const mockStore = MockStore();

  describe('should render correctly', () => {
    function onClose() {
      jest.fn();
    }
    it('should render modal wrapper', () => {
      const { withStoreComponent } = withStore(<ModalWindow title={'Тестовое модальное окно'} onClose={onClose}>Модальное окно</ModalWindow>, mockStore);

      render(withStoreComponent);

      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });

  });

});
