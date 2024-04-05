import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Breadcrumb, Camera, CameraBasket, CouponName } from '../../types/types';
import { AppRoutes, ChangeProductCount, breadcrumbBasket, breadcrumbNames } from '../../const/const';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCamerasFromCart, getCreateOrderFailStatus, getCreateOrderSuccessStatus, getPromocode } from '../../store/basket-slice/selectors';
import { changeCountCameraInBasket, closeErrorModal, deleteFromCart, resetCart, resetPromocode } from '../../store/basket-slice/basket-slice';
import BasketProductItem from '../../components/basket-product-item/basket-product-item';
import { ChangeEvent, Fragment, MouseEvent, useEffect, useRef, useState } from 'react';
import ModalWindow from '../../components/modal-window/modal-window';
import RemoveItemPopup from '../../components/popup/remove-item-popup/remove-item-popup';
import { Link, useNavigate } from 'react-router-dom';
import { returnFormatedPrice } from '../../utils/common';
import BasketPromo from '../../components/basket-promo/basket-promo';
import { fetchSendOrder } from '../../store/api-actions';
import ThanksPopup from '../../components/popup/thanks-popup/thanks-popup';
import classNames from 'classnames';

function BasketScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const breadcrumbsScreen: Breadcrumb[] = [breadcrumbNames.main, breadcrumbNames.catalog, {title: breadcrumbBasket.title}];

  const cameras = useAppSelector(getCamerasFromCart);

  const [cameraCard, setCameraCard] = useState<Camera | null>(null);

  const [removeItemModal, setRemoveItemModal] = useState(false);

  const focusItemRemovePopup = useRef<HTMLButtonElement>(null);

  const totalPriceCameras = cameras.reduce((prev, current) => prev + (current.price * current.count), 0);
  const [totalPrice, setTotalPrice] = useState<number>(totalPriceCameras);
  const promocode = useAppSelector(getPromocode);

  const discount = promocode.discount ? totalPrice * (promocode.discount / 100) : 0;
  const totalPriceWithDiscount = totalPrice - discount;

  const focusThanksPopup = useRef<HTMLButtonElement>(null);
  const isSuccessCreateOrder = useAppSelector(getCreateOrderSuccessStatus);
  const isFailCreateOrder = useAppSelector(getCreateOrderFailStatus);
  const [couponState, setCouponState] = useState<CouponName | string>(promocode.coupon || '');
  useEffect(() => {
    setTotalPrice(totalPriceCameras);
  }, [totalPriceCameras]);

  function handleCloseRemoveItemModalClick() {
    setRemoveItemModal(false);
  }

  function handleRemoveItemModalClick (camera: Camera) {
    setRemoveItemModal(true);
    setCameraCard(camera);
  }

  function handleDeleteButtonClick(id: Camera['id']) {
    dispatch(deleteFromCart(id));
    setRemoveItemModal(false);
    setCameraCard(null);
  }

  function handleContinueButtonClick(evt: MouseEvent<HTMLAnchorElement>) {
    evt.preventDefault();
    setRemoveItemModal(false);
    navigate(AppRoutes.Root);
  }

  function handleIncreaseButtonClick(id: CameraBasket['id']) {
    dispatch(changeCountCameraInBasket({type: ChangeProductCount.Increase, id}));
  }

  function handleDecreaseButtonClick(id: CameraBasket['id']) {
    dispatch(changeCountCameraInBasket({type: ChangeProductCount.Decrease, id}));
  }

  function handleCountChange(event: ChangeEvent<HTMLInputElement>, id: CameraBasket['id']) {
    if(event.target.value.length){
      dispatch(changeCountCameraInBasket({type: ChangeProductCount.SetCount, id, count: Number(event.target.value) }));
    } else {
      dispatch(changeCountCameraInBasket({type: ChangeProductCount.SetCount, id, count: 1 }));
    }
  }

  function handleOrderButtonClick() {
    const camerasIds = cameras.map((camera) => camera.id);
    dispatch(fetchSendOrder({
      camerasIds: camerasIds,
      coupon: promocode.coupon
    }));
  }

  function handleCloseThanksOrderModalClick() {
    if(isSuccessCreateOrder){
      dispatch(resetCart());
      dispatch(resetPromocode());
      setCouponState('');
    }
    if(isFailCreateOrder){
      dispatch(closeErrorModal());
    }
  }

  return(
    <div className="wrapper">
      <Helmet>Backet</Helmet>
      <Header />
      <main>
        <div className="page-content">
          {<Breadcrumbs breadcrumbs={breadcrumbsScreen} />}
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              {
                cameras.length ? (
                  <ul className="basket__list">
                    {
                      cameras.map((camera) => (
                        <BasketProductItem
                          key={`basket-camera-${camera.id}`}
                          camera={camera}
                          onRemoveClick={handleRemoveItemModalClick}
                          onIncreaseButtonClick={handleIncreaseButtonClick}
                          onDecreaseButtonClick={handleDecreaseButtonClick}
                          onCountChange={handleCountChange}
                        />
                      ))
                    }
                  </ul>
                ) :
                  <Fragment>
                    <p>Ваша корзина пока пуста...</p>
                    <Link to={AppRoutes.Root} className='link'>Перейти в каталог</Link>
                  </Fragment>
              }
              <div className="basket__summary">
                <BasketPromo setCouponState={setCouponState} couponState={couponState} />
                <div className="basket__summary-order">
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Всего:</span>
                    <span className="basket__summary-value">{returnFormatedPrice(totalPrice)}</span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Скидка:</span>
                    <span
                      className={classNames(
                        'basket__summary-value',
                        {'basket__summary-value--bonus' : discount}
                      )}
                    >
                      {returnFormatedPrice(discount)}
                    </span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
                    <span className="basket__summary-value basket__summary-value--total">{returnFormatedPrice(totalPriceWithDiscount)}</span>
                  </p>
                  <button
                    className="btn btn--purple"
                    type="submit"
                    onClick={handleOrderButtonClick}
                    disabled={cameras.length === 0}
                  >
                    Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      {
        removeItemModal && (
          <ModalWindow
            title='Удалить этот товар?'
            onClose={handleCloseRemoveItemModalClick}
            firstFocusElement={focusItemRemovePopup}
          >
            <RemoveItemPopup
              camera={cameraCard}
              focusElement={focusItemRemovePopup}
              onDeleteButtonClick={handleDeleteButtonClick}
              onContinueButtonClick={handleContinueButtonClick}
            />
          </ModalWindow>)
      }
      {
        (isSuccessCreateOrder || isFailCreateOrder) && (
          <ModalWindow
            title={isFailCreateOrder ? 'Не удалось отправить данные' : 'Спасибо за покупку'}
            onClose={handleCloseThanksOrderModalClick}
            firstFocusElement={focusThanksPopup}
            isResponse
          >
            <ThanksPopup
              focusElement={focusThanksPopup}
              isModalOrder
              onClickContinue={handleCloseThanksOrderModalClick}
              isErrorCreateOrder={isFailCreateOrder}
            />
          </ModalWindow>)
      }
      <Footer />
    </div>
  );
}

export default BasketScreen;
