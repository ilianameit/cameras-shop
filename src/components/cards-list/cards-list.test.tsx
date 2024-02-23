import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import CardsList from './cards-list';
import { mockCameras } from '../../utils/mocks';

describe('Component CardsList', () => {

  describe('should render correctly', () => {
    function onBuyClick() {
      jest.fn();
    }
    it('should render cards list wrapper', () => {
      const preparedComponent = withHistory(<CardsList cameras={mockCameras} onBuyClick={onBuyClick} />);

      render(preparedComponent);

      expect(screen.getByTestId('cardsList')).toBeInTheDocument();
    });

  });
});
