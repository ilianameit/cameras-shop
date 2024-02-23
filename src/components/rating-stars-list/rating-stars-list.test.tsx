import { render, screen } from '@testing-library/react';
import RatingStarsList from './rating-stars-list';
import { mockCamera } from '../../utils/mocks';

describe('Component Stars Rating List', () => {

  describe('should render correctly', () => {

    it('should render stars', () => {
      render(
        <RatingStarsList id={mockCamera.id} rating={1} />
      );
      expect(screen.getAllByTitle('stars')).toBeInTheDocument();
    });
  });

});
//stars
