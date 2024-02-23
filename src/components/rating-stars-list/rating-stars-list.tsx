import { memo } from 'react';
import { Id, Rating } from '../../types/types';

const RATING_STAR = 5;
type RatingStarsListProps = {
  id: Id | string;
  rating: Rating;
}
function RatingStarsListComponent({id, rating}: RatingStarsListProps): JSX.Element{
  return(
    <>
      {
        Array.from({length: RATING_STAR}, (_, index) => index).map((value) => (
          <svg key={`${id}-rating-${value}`} width="17" height="16" aria-hidden="true" data-icon='stars'>
            <title>stars</title>
            <use xlinkHref={value < rating ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
        ))
      }
    </>
  );
}

const RatingStarsList = memo(RatingStarsListComponent);
export default RatingStarsList;
