import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import CardsList from './cards-list';
import { MockStore, mockCameras } from '../../utils/mocks';

describe('Component CardsList', () => {

  describe('should render correctly', () => {
    function onBuyClick() {
      jest.fn();
    }
    const mockStore = MockStore();
    it('should render cards list wrapper', () => {
      const {withStoreComponent} = withStore(<CardsList cameras={mockCameras} onBuyClick={onBuyClick} />, mockStore);
      const preparedComponent = withHistory(withStoreComponent);

      render(preparedComponent);

      expect(screen.getByTestId('cardsList')).toBeInTheDocument();
    });

  });
});
