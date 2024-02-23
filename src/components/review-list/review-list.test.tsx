import { render, screen } from '@testing-library/react';
import { MockStore, mockCamera } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import ReviewList from './review-list';


describe('Component ReviewsList', () => {

  const mockStore = MockStore();

  describe('should render correctly', () => {
    function onReviewClick() {
      jest.fn();
    }

    it('should render title reviews', () => {

      const { withStoreComponent } = withStore(<ReviewList id={mockCamera.id} onReviewClick={onReviewClick} />, mockStore);

      const preparedComponent = withHistory(withStoreComponent);

      render(preparedComponent);

      expect(screen.getByText(/отзывы/i)).toBeInTheDocument();
    });

  });

});
