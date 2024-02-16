import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOneCamera, getSimilarCameras, getStatusLoadingOneCamera } from '../../store/camera-slice/selectors';
import { useEffect, useState } from 'react';
import { fetchOneCameraAction, fetchSimilarCamerasAction } from '../../store/api-actions';
import { dropCamera } from '../../store/camera-slice/camera-slice';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import RatingStarsList from '../../components/rating-stars-list/rating-stars-list';
import { returnFormatedPrice } from '../../utils/common';
import { createPortal } from 'react-dom';
import AddItemPopup from '../../components/popup/add-item-popup/add-item-popup';
import { TabName } from '../../const/const';
import { TabType } from '../../types/types';
import ProductTabs from '../../components/product-tabs/product-tabs';
import ProductSimilarSlider from '../../components/product-similar-slider/product-similar-slider';
import ReviewList from '../../components/review-list/review-list';
import ButtonUp from '../../components/button-up/button-up';
import ReviewPopup from '../../components/popup/review-popup/review-popup';

function ProductScreen(): JSX.Element {

  const dispatch = useAppDispatch();
  const {id} = useParams();

  const [tabParams, setTabParams] = useSearchParams({ tab: TabName.Description });
  const currentTab = tabParams.get('tab') as TabType;

  const camera = useAppSelector(getOneCamera);
  const isLoading = useAppSelector(getStatusLoadingOneCamera);
  const [showAddItemModal, setAddItemModal] = useState(false);
  const [showReviewModal, setReviewModal] = useState(false);
  const similarCameras = useAppSelector(getSimilarCameras);

  useEffect(() => {
    if(!id) {
      return;
    }

    dispatch(fetchOneCameraAction(id));
    dispatch(fetchSimilarCamerasAction(id));

    return () => {
      dispatch(dropCamera());
    };
  }, [dispatch, id]);

  if(!camera && isLoading) {
    return <LoadingScreen />;
  }

  if(!camera || !id) {
    return <NotFoundScreen />;
  }

  function handleTabButtonClick(type: TabType) {
    setTabParams({ tab: type });
  }

  const {id: idCamera, name, reviewCount, rating, price, description, vendorCode, category, type, level, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = camera;
  const features = { vendorCode, category, type, level };

  return(
    <div className="wrapper">
      <Helmet>
        <title>Продукт - {name}</title>
      </Helmet>
      <Header />
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="index.html">Главная
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="catalog.html">Каталог
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">
                    {name}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}
                    />
                    <img
                      src={`/${previewImg}`}
                      srcSet={`/${previewImg2x} 2x`}
                      width={560}
                      height={480}
                      alt={name}
                    />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{name}</h1>
                  <div className="rate product__rate">
                    <RatingStarsList id={idCamera} rating={rating} />
                    <p className="visually-hidden">Рейтинг: {rating}</p>
                    <p className="rate__count">
                      <span className="visually-hidden">Всего оценок:</span>
                      {reviewCount}
                    </p>
                  </div>
                  <p className="product__price">
                    <span className="visually-hidden">Цена:</span>
                    {returnFormatedPrice(price)} ₽
                  </p>
                  <button
                    className="btn btn--purple"
                    type="button"
                    onClick={() => setAddItemModal(true)}
                  >
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>Добавить в корзину
                  </button>
                  <ProductTabs currentTab={currentTab} features={features} description={description} onTabButtonClick={handleTabButtonClick} />
                </div>
              </div>
            </section>
          </div>
          {
            similarCameras.length > 0 &&
              <ProductSimilarSlider onBuyClick={() => setAddItemModal(true)} similarCameras={similarCameras}/>
          }
          <ReviewList id={id} onReviewClick={() => setReviewModal(true)}/>
        </div>
        {showAddItemModal && createPortal(
          <AddItemPopup onClose={() => setAddItemModal(false)} />,
          document.body
        )}

        {showReviewModal && createPortal(
          <ReviewPopup idCamera={idCamera} onClose={() => setReviewModal(false)} />,
          document.body
        )}
      </main>
      <ButtonUp />
      <Footer />
    </div>
  );
}

export default ProductScreen;
