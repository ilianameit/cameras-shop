import { Fragment, KeyboardEvent, memo, useEffect, useRef, useState } from 'react';
import { NAME_KEY_TAB, ratingStarsName } from '../../../const/const';
import { Rating, ReviewAdding } from '../../../types/types';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { Id } from 'react-toastify';
import { fetchAddReviewAction } from '../../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getAddReviewSuccessStatus, getStatusLoadingReview } from '../../../store/review/selectors';
import { changeAddReviewIsSucces } from '../../../store/review/review-slice';
import ModalWindow from '../../modal-window/modal-window';
import ThanksPopup from '../thanks-popup/thanks-popup';

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

const VALIDATION_CONSTRAINTS = {
  MAX_LENGTH_TEXT: 160,
  MIN_LENGTH_TEXT: 10,
  RATE: {
    REQUIRED: 'Нужно оценить товар'
  },
  USER_NAME: {
    REQUIRED: 'Нужно указать имя',
    MAX_LENGTH: 15,
    MIN_LENGTH: 2,
    PATTERN: {
      value: /^[А-Яа-яЁёA-Za-z]+$/i,
      message: 'Введите корректное имя'
    }
  },
  USER_PLUS: {
    REQUIRED: 'Нужно указать достоинства',
  },
  USER_MINUS: {
    REQUIRED: 'Нужно указать недостатки'
  },
  USER_COMMENT: {
    REQUIRED: 'Нужно добавить комментарий'
  }
};


function ReviewPopupComponent({onClose, idCamera}: ReviewPopupProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoadingReview = useAppSelector(getStatusLoadingReview);
  const isAddReviewSucces = useAppSelector(getAddReviewSuccessStatus);

  const { register, handleSubmit, setFocus, watch, formState: { errors }, reset} = useForm<FormValues>({
    mode: 'onSubmit'
  });

  const [rating, setRating] = useState<Rating>(0);

  const lastRefModal = useRef(null);

  const firstFocusThanksElement = useRef<HTMLButtonElement| null>(null);

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

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === NAME_KEY_TAB && !event.shiftKey && event.target === lastRefModal.current) {
      event.preventDefault();
      setFocus('rate');
    }
  };

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
      <ModalWindow title={'Спасибо за отзыв'} onClose={onClose} firstFocusElement={firstFocusThanksElement} isResponse>
        <ThanksPopup focusElement={firstFocusThanksElement} />
      </ModalWindow> :
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
                            required: VALIDATION_CONSTRAINTS.RATE.REQUIRED,
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
              {errors.rate && <p className="rate__message">Нужно оценить товар</p>}
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
                      required: VALIDATION_CONSTRAINTS.USER_NAME.REQUIRED,
                      maxLength: VALIDATION_CONSTRAINTS.USER_NAME.MAX_LENGTH,
                      minLength: VALIDATION_CONSTRAINTS.USER_NAME.MIN_LENGTH,
                      pattern: VALIDATION_CONSTRAINTS.USER_NAME.PATTERN
                    })}
                  disabled={isLoadingReview}
                />
              </label>
              {errors['user-name'] && <p className="custom-input__error">{errors['user-name'].type === 'pattern' ? VALIDATION_CONSTRAINTS.USER_NAME.PATTERN.message : 'Нужно указать имя'}</p>}

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
                      required: VALIDATION_CONSTRAINTS.USER_PLUS.REQUIRED,
                      maxLength: VALIDATION_CONSTRAINTS.MAX_LENGTH_TEXT,
                      minLength: VALIDATION_CONSTRAINTS.MIN_LENGTH_TEXT,
                    }
                  )}
                  disabled={isLoadingReview}
                />
              </label>
              {errors['user-plus'] && <p className="custom-input__error">Нужно указать достоинства</p>}
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
                    required: VALIDATION_CONSTRAINTS.USER_MINUS.REQUIRED,
                    maxLength: VALIDATION_CONSTRAINTS.MAX_LENGTH_TEXT,
                    minLength: VALIDATION_CONSTRAINTS.MIN_LENGTH_TEXT,
                  })}
                  disabled={isLoadingReview}
                />
              </label>
              {errors['user-minus'] && <p className="custom-input__error">Нужно указать недостатки</p>}
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
                    required: VALIDATION_CONSTRAINTS.USER_COMMENT.REQUIRED,
                    maxLength: VALIDATION_CONSTRAINTS.MAX_LENGTH_TEXT,
                    minLength: VALIDATION_CONSTRAINTS.MIN_LENGTH_TEXT,
                  })}
                  disabled={isLoadingReview}
                >
                </textarea>
              </label>
              {errors['user-comment'] && <div className="custom-textarea__error">Нужно добавить комментарий</div>}
            </div>
          </div>
          <button
            className="btn btn--purple form-review__btn"
            type="submit"
            aria-label="отправить отзыв"
            ref={lastRefModal}
            onKeyDown={handleKeyDown}
          >
            { !isLoadingReview ? 'Отправить отзыв' : '...Отправка'}
          </button>
        </form>
      </div>
  );
}

const ReviewPopup = memo(ReviewPopupComponent);
export default ReviewPopup;
