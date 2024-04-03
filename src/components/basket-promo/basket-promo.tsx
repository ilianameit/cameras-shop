import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { CouponName } from '../../types/types';
import { fetchDiscountAction } from '../../store/api-actions';
import { getInvalidCouponStatus, getPromocode, getStatusLoadingDiscount } from '../../store/promo-slice/selectors';
import classNames from 'classnames';
import { setCouponName } from '../../store/promo-slice/promo-slice';

type FormValues = {
  promo: CouponName;
}

function BasketPromo(): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getStatusLoadingDiscount);
  const invalidCouponStatus = useAppSelector(getInvalidCouponStatus);
  const promocode = useAppSelector(getPromocode);

  const {
    register,
    handleSubmit,
  } = useForm<FormValues>(
    {
      mode: 'onSubmit'
    }
  );

  function handleFormSubmit(data: FormValues) {
    if ((!promocode.coupon || invalidCouponStatus) && data.promo.length) {
      dispatch(setCouponName(data.promo));
      dispatch(fetchDiscountAction(data.promo));
    }
  }

  return(
    <div className="basket__promo">
      <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
      <div className="basket-form">
        <form
          action="#"
          onSubmit={(event) =>
            void handleSubmit(handleFormSubmit)(event)}
        >
          <div className={classNames(
            'custom-input',
            { 'is-invalid': invalidCouponStatus},
            { 'is-valid': promocode.discount !== 0 }
          )}
          >
            <label><span className="custom-input__label">Промокод</span>
              <input
                type="text"
                placeholder="Введите промокод"
                {...register('promo', {
                  required: true,
                })}
                disabled={isLoading}
              />
            </label>
            {invalidCouponStatus && <p className="custom-input__error">Промокод неверный</p>}
            {promocode.discount !== 0 && <p className="custom-input__success">Промокод принят!</p>}
          </div>
          <button
            className="btn"
            type="submit"
            disabled={isLoading}
          >
            Применить
          </button>
        </form>
      </div>
    </div>
  );
}

export default BasketPromo;
