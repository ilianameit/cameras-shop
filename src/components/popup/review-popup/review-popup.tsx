import { Fragment, memo, useEffect, useState } from 'react';
import ModalWindow from '../../modal-window/modal-window';
import { ratingStarsName } from '../../../const/const';
import { Rating, ReviewAdding } from '../../../types/types';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { Id } from 'react-toastify';
import { fetchAddReviewAction } from '../../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import ReviewAddedPopup from '../review-added-popup/review-added-popup';
import { getAddReviewSuccessStatus, getStatusLoadingReview } from '../../../store/review/selectors';
import { changeAddReviewIsSucces } from '../../../store/review/review-slice';

type ReviewPopupProps = {
  onClose: () => void;
  idCamera: Id;
}

type FormValues = {
  rate: Rating;
  ['user-name']: string;
  ['user-plus']: string;
  ['user-minus']: string;
  ['user-comment']: string;
}

function ReviewPopupComponent({onClose, idCamera}: ReviewPopupProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoadingReview = useAppSelector(getStatusLoadingReview);
  const isAddReviewSucces = useAppSelector(getAddReviewSuccessStatus);

  const { register, handleSubmit, setFocus, watch, formState: { errors }, reset} = useForm<FormValues>({
    mode: 'onSubmit'
  });

  const [rating, setRating] = useState<Rating>(0);

  useEffect(() => {
    setFocus('user-name');

    return () => {
      if(isAddReviewSucces){
        reset();
        dispatch(changeAddReviewIsSucces());
      }
    };
  }, [dispatch, isAddReviewSucces, reset, setFocus]);

  function handleRatingChange() {
    setRating(watch('rate'));
  }

  function handleFormSubmit(dataValues: FormValues) {
    const data: ReviewAdding = {
      cameraId: Number(idCamera),
      userName: dataValues['user-name'],
      advantage: dataValues['user-plus'],
      disadvantage: dataValues['user-minus'],
      review: dataValues['user-comment'],
      rating: Number(dataValues.rate)
    };

    dispatch(fetchAddReviewAction(data));
  }

  return(
    isAddReviewSucces ?
      <ReviewAddedPopup onClose={onClose} /> :

      <ModalWindow title={'Оставить отзыв'} onClose={onClose}>
        <div className="form-review">
          <form
            method="post"
            onSubmit={(event) =>
              void handleSubmit(handleFormSubmit)(event)}
          >
            <div className="form-review__rate">
              <fieldset
                className={classNames(
                  'rate form-review__item',
                  { 'is-invalid': errors.rate || false }
                )}
              >
                <legend className="rate__caption">Рейтинг
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </legend>
                <div className="rate__bar">
                  <div className="rate__group">
                    {Object.entries(ratingStarsName)
                      .reverse()
                      .map(([score, title]) => (
                        <Fragment key={score}>
                          <input
                            className="visually-hidden"
                            id={`star-${score}`}
                            type="radio"
                            value={score}
                            {...register('rate', {
                              required: 'Нужно оценить товар',
                              onChange: handleRatingChange,
                            })}
                            disabled={isLoadingReview}
                          />
                          <label
                            className="rate__label"
                            htmlFor={`star-${score}`}
                            title={title}
                          >
                          </label>
                        </Fragment>
                      ))}
                  </div>
                  <div className="rate__progress"><span className="rate__stars">{rating}</span> <span>/</span> <span className="rate__all-stars">5</span>
                  </div>
                </div>
                {errors.rate && <p className="rate__message">{errors.rate?.message}</p>}
              </fieldset>
              <div className={classNames(
                'custom-input form-review__item',
                {'is-invalid':  errors['user-name'] || false}
              )}
              >
                <label>
                  <span className="custom-input__label">Ваше имя
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Введите ваше имя"
                    {...register('user-name',
                      {
                        required: 'Нужно указать имя',
                        maxLength: 15,
                        minLength: 2,
                        pattern: {
                          value: /^[А-Яа-яЁёA-Za-z]+$/i,
                          message: 'Введите корректное имя'
                        }
                      })}
                    disabled={isLoadingReview}
                  />
                </label>
                {errors['user-name'] && <p className="custom-input__error">{errors['user-name']?.message}</p>}

              </div>
              <div className={classNames(
                'custom-input form-review__item',
                { 'is-invalid': errors['user-plus'] || false }
              )}
              >
                <label>
                  <span className="custom-input__label">Достоинства
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Основные преимущества товара"
                    {...register('user-plus',
                      {
                        required: 'Нужно указать достоинства',
                        maxLength: 160,
                        minLength: 10,
                      }
                    )}
                    disabled={isLoadingReview}
                  />
                </label>
                {errors['user-plus'] && <p className="custom-input__error">{errors['user-plus']?.message}</p>}
              </div>
              <div className={classNames(
                'custom-input form-review__item',
                {'is-invalid': errors['user-minus'] || false}
              )}
              >
                <label>
                  <span className="custom-input__label">Недостатки
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Главные недостатки товара"
                    {...register('user-minus', {
                      required: 'Нужно указать недостатки',
                      maxLength: 160,
                      minLength: 10,
                    })}
                    disabled={isLoadingReview}
                  />
                </label>
                {errors['user-minus'] && <p className="custom-input__error">{errors['user-minus']?.message}</p>}
              </div>
              <div className={classNames(
                'custom-textarea form-review__item',
                { 'is-invalid': errors['user-comment'] || false }
              )}
              >
                <label>
                  <span className="custom-textarea__label">Комментарий
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </span>
                  <textarea
                    placeholder="Поделитесь своим опытом покупки"
                    {...register('user-comment', {
                      required: 'Нужно добавить комментарий',
                      maxLength: 160,
                      minLength: 10,
                    })}
                    disabled={isLoadingReview}
                  >
                  </textarea>
                </label>
                {errors['user-comment'] && <div className="custom-textarea__error">{errors['user-comment']?.message}</div>}
              </div>
            </div>
            <button
              className="btn btn--purple form-review__btn"
              type="submit"
              aria-label="отправить отзыв"
            >
              { !isLoadingReview ? 'Отправить отзыв' : '...Отправка'}
            </button>
          </form>
        </div>
      </ModalWindow>
  );
}

const ReviewPopup = memo(ReviewPopupComponent);
export default ReviewPopup;
