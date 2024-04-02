import { Fragment } from 'react';
import { Camera } from '../../types/types';
import { returnFormatedPrice } from '../../utils/common';

type BasketProductCardInfoProps = {
  camera: Camera;
  screenType: 'basket' | 'addItem' | 'removeItem';
}

function BasketProductCardInfo({camera, screenType}: BasketProductCardInfoProps): JSX.Element {
  const {previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, category, name, vendorCode, type, level, price} = camera;
  return(
    <Fragment>
      <div className="basket-item__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}
          />
          <img
            src={`/${previewImg}`}
            srcSet={`/${previewImg2x} 2x`}
            width={140}
            height={120}
            alt={`${category} «${name}»`}
          />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{type} {category === 'Фотоаппарат' ? 'фотокамера' : 'видеокамера'}</li>
          <li className="basket-item__list-item">{level} уровень</li>
        </ul>
        {
          screenType === 'addItem' && <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{returnFormatedPrice(price)} ₽</p>
        }
      </div>
      {
        screenType === 'basket' && <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{returnFormatedPrice(price)} ₽</p>
      }
    </Fragment>
  );
}
export default BasketProductCardInfo;
