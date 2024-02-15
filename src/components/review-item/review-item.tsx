import dayjs from 'dayjs';
import { Review } from '../../types/types';
import RatingStarsList from '../rating-stars-list/rating-stars-list';

type ReviewIpemProps = {
  review: Review;
}
function ReviewItem({review}: ReviewIpemProps): JSX.Element{
  const {id, createAt, userName, advantage, disadvantage, review: reviewText, rating} = review;
  return(
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime={createAt.split('T')[0]}>
          {dayjs(review.createAt).format('DD MMMM')}
        </time>
      </div>
      <div className="rate review-card__rate">
        <RatingStarsList id={id} rating={rating} />
        <p className="visually-hidden">Оценка: {rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{reviewText}</p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewItem;
