import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import CardItem from './card-item';
import { mockCamera } from '../../utils/mocks';

describe('Component CardItem', () => {
  function onBuyClick() {
    jest.fn();
  }
  beforeEach(() => {
    const preparedComponent = withHistory(<CardItem camera={mockCamera} onBuyClick={onBuyClick}/>);

    render(preparedComponent);
  });

  describe('should render correctly', () => {

    it('should render buy button and more details button', () => {
      expect(screen.getByRole('button', { name: /купить/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /подробнее/i })).toBeInTheDocument();
    });

    it('should render product details', () => {
      expect(screen.getByText(/рейтинг/i)).toBeInTheDocument();
      expect(screen.getByText(/всего оценок/i)).toBeInTheDocument();
      expect(screen.getByText(/цена/i)).toBeInTheDocument();
    });

  });

});
