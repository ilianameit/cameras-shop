import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOneCamera, getSimilarCameras, getStatusLoadingOneCamera } from '../../store/camera-slice/selectors';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchOneCameraAction, fetchSimilarCamerasAction } from '../../store/api-actions';
import { dropCamera } from '../../store/camera-slice/camera-slice';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import RatingStarsList from '../../components/rating-stars-list/rating-stars-list';
import { returnFormatedPrice } from '../../utils/common';
import AddItemPopup from '../../components/popup/add-item-popup/add-item-popup';
import { AppRoutes, TabName } from '../../const/const';
import { Breadcrumb, TabType } from '../../types/types';
import ProductTabs from '../../components/product-tabs/product-tabs';
import ProductSimilarSlider from '../../components/product-similar-slider/product-similar-slider';
import ReviewList from '../../components/review-list/review-list';
import ButtonUp from '../../components/button-up/button-up';
import ReviewPopup from '../../components/popup/review-popup/review-popup';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ModalWindow from '../../components/modal-window/modal-window';

function ProductScreen(): JSX.Element {

  const dispatch = useAppDispatch();
  const {id} = useParams();

  const [tabParams, setTabParams] = useSearchParams({ tab: TabName.Description });
  const currentTab = useMemo(() => tabParams.get('tab') as TabType, [tabParams]);
  const camera = useAppSelector(getOneCamera);
  const isLoading = useAppSelector(getStatusLoadingOneCamera);
  const [showAddItemModal, setAddItemModal] = useState(false);
  const [showReviewModal, setReviewModal] = useState(false);
  const similarCameras = useAppSelector(getSimilarCameras);

  const handleAddItemModal = useCallback(() => setAddItemModal(true), []);
  const handleCloseAddItemModal = useCallback(() => setAddItemModal(false), []);

  const handleTabButtonClick = useCallback((type: TabType) => {
    setTabParams({ tab: type });
  }, [setTabParams]);

  const handleAddReviewModal = useCallback(() => setReviewModal(true), []);
  const handleCloseAddReviewModal = useCallback(() => setReviewModal(false), []);

  useEffect(() => {
    if(!id) {
      return;
    }

    dispatch(fetchOneCameraAction(Number(id)));
    dispatch(fetchSimilarCamerasAction(Number(id)));
    setTabParams({ tab: currentTab });

    return () => {
      dispatch(dropCamera());
    };
  }, [currentTab, dispatch, id, setTabParams]);

  if(!camera && isLoading) {
    return <LoadingScreen />;
  }

  if(!camera || !id) {
    return <NotFoundScreen />;
  }

  const {id: idCamera, name, reviewCount, rating, price, description, vendorCode, category, type, level, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = camera;
  const features = { vendorCode, category, type, level };

  const breadcrumbsScreen: Breadcrumb[] = [{title: 'Главная', href: AppRoutes.Root}, {title: 'Каталог', href: AppRoutes.Root}, {title: name}];


  return(
    <div className="wrapper">
      <Helmet>
        <title>Продукт - {name}</title>
      </Helmet>
      <Header />
      <main>
        <div className="page-content">
          <Breadcrumbs breadcrumbs={breadcrumbsScreen} />
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
                    data-testid="button-to-basket"
                    onClick={handleAddItemModal}
                  >
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>
                    Добавить в корзину
                  </button>
                  <ProductTabs currentTab={currentTab} features={features} description={description} onTabButtonClick={handleTabButtonClick} />
                </div>
              </div>
            </section>
          </div>
          {
            similarCameras.length > 0 &&
              <ProductSimilarSlider onBuyClick={handleAddItemModal} similarCameras={similarCameras}/>
          }
          <ReviewList id={idCamera} onReviewClick={handleAddReviewModal}/>
        </div>
        {
          showAddItemModal && (
            <ModalWindow
              title='Добавить товар в корзину'
              onClose={handleCloseAddItemModal}
            >
              <AddItemPopup/>
            </ModalWindow>)
        }
        {
          showReviewModal &&
          <ModalWindow
            title={'Оставить отзыв'}
            onClose={handleCloseAddReviewModal}
          >
            <ReviewPopup idCamera={idCamera} onClose={handleCloseAddReviewModal}/>
          </ModalWindow>
        }
      </main>
      <ButtonUp />
      <Footer />
    </div>
  );
}

export default ProductScreen;
