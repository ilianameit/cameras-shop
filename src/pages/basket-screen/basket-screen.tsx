import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Breadcrumb, Camera, CameraBasket } from '../../types/types';
import { AppRoutes, ChangeProductCount, breadcrumbBasket, breadcrumbNames } from '../../const/const';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCamerasFromCart } from '../../store/camera-slice/selectors';
import BasketProductItem from '../../components/basket-product-item/basket-product-item';
import { changeCountCameraInBasket, deleteFromCart } from '../../store/camera-slice/camera-slice';
import { ChangeEvent, Fragment, MouseEvent, useEffect, useRef, useState } from 'react';
import ModalWindow from '../../components/modal-window/modal-window';
import RemoveItemPopup from '../../components/popup/remove-item-popup/remove-item-popup';
import { Link, useNavigate } from 'react-router-dom';
import { returnFormatedPrice } from '../../utils/common';

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
    dispatch(changeCountCameraInBasket({type: ChangeProductCount.SetCount, id, count: Number(event.target.value) }));
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
                <div className="basket__promo">
                  <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
                  <div className="basket-form">
                    <form action="#">
                      <div className="custom-input">
                        <label><span className="custom-input__label">Промокод</span>
                          <input type="text" name="promo" placeholder="Введите промокод" />
                        </label>
                        <p className="custom-input__error">Промокод неверный</p>
                        <p className="custom-input__success">Промокод принят!</p>
                      </div>
                      <button className="btn" type="submit">Применить
                      </button>
                    </form>
                  </div>
                </div>
                <div className="basket__summary-order">
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Всего:</span>
                    <span className="basket__summary-value">{returnFormatedPrice(totalPrice)}</span>
                  </p>
                  <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className="basket__summary-value basket__summary-value--bonus">0 ₽</span></p>
                  <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">111 390 ₽</span></p>
                  <button className="btn btn--purple" type="submit">Оформить заказ
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
      <Footer />
    </div>
  );
}

export default BasketScreen;
