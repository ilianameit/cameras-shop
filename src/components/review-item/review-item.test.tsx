import { render, screen } from '@testing-library/react';
import ReviewItem from './review-item';
import { mockReview } from '../../utils/mocks';

describe('Component ReviewsItem', () => {

  it('should render review', () => {

    render(<ReviewItem review={mockReview}/>);

    expect(screen.getByTestId('data')).toBeInTheDocument();
    expect(screen.getByText(/Оценка/i)).toBeInTheDocument();
    expect(screen.getByText(/Достоинства/i)).toBeInTheDocument();
    expect(screen.getByText(/Недостатки/i)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий/i)).toBeInTheDocument();
  });

});
