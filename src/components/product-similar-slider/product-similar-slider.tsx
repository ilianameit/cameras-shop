import { Navigation, A11y, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import CardItem from '../card-item/card-item';
import styles from './style.module.css';
import { Camera } from '../../types/types';
import { memo } from 'react';
import classNames from 'classnames';

type ProductSimilarSliderProps = {
  onBuyClick: () => void;
  similarCameras: Camera[];
}

function ProductSimilarSliderComponent({onBuyClick, similarCameras}: ProductSimilarSliderProps): JSX.Element {

  return(
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <Swiper
              modules={[Navigation, A11y, Keyboard]}
              keyboard={{
                enabled: true,
              }}
              slidesPerView={3}
              slidesPerGroupSkip={0}
              spaceBetween={16}
              centeredSlides = {false}
              navigation={{
                prevEl: '.slider-controls--prev',
                nextEl: '.slider-controls--next',
              }}
              breakpoints={{
                0: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                },
              }}
              className={classNames(
                'product-similar__slider-list',
                {[`${styles['static-position']}`]: true}
              )}
            >
              {similarCameras.map((cameraValue) => (
                <SwiperSlide key={`similar-item-${cameraValue.id}`} className={`product-card is-active ${styles.card}`}>
                  <CardItem camera={cameraValue} onBuyClick={onBuyClick} isSwiperCard />
                </SwiperSlide>
              ))}

              <button
                className="slider-controls--prev"
                type="button"
                aria-label="Предыдущий слайд"
                style={{ pointerEvents: 'auto' }}
              >
                <svg width={7} height={12} aria-hidden="true">
                  <use xlinkHref="#icon-arrow"></use>
                </svg>
              </button>
              <button
                className="slider-controls--next"
                type="button"
                aria-label="Следующий слайд"
                style={{ pointerEvents: 'auto' }}
              >
                <svg width={7} height={12} aria-hidden="true">
                  <use xlinkHref="#icon-arrow"></use>
                </svg>
              </button>
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
}

const ProductSimilarSlider = memo(ProductSimilarSliderComponent);
export default ProductSimilarSlider;
