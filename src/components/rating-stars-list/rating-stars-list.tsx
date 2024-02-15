import { Id, Rating } from '../../types/types';

const RATING_STAR = 5;
type RatingStarsListProps = {
  id: Id | string;
  rating: Rating;
}
function RatingStarsList({id, rating}: RatingStarsListProps): React.ReactElement[]{
  return(
    Array.from({length: RATING_STAR}, (_, index) => index).map((value) => (
      <svg key={`${id}-rating-${value}`} width="17" height="16" aria-hidden="true">
        <use xlinkHref={value < rating ? '#icon-full-star' : '#icon-star'}></use>
      </svg>
    ))
  );
}

export default RatingStarsList;
