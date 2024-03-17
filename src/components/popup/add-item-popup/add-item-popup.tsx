import { RefObject, memo, useEffect } from 'react';
import { Camera } from '../../../types/types';
import { returnFormatedPrice } from '../../../utils/common';

type AddItemPopupComponentProps = {
  camera: Camera | null;
  focusElement: RefObject<HTMLButtonElement>;
}

function AddItemPopupComponent({camera, focusElement}: AddItemPopupComponentProps): JSX.Element {

  useEffect(() => {
    if (focusElement && focusElement.current) {
      focusElement.current.focus();
    }
  }, [focusElement]);

  if (!camera) {
    return <div>Loading...</div>;
  }

  const {previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, name, vendorCode, category, type, level, price} = camera;
  return(
    <>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`} />
            <img src={`/${previewImg}`} srcSet={`/${previewImg2x} 2x`} width={140} height={120} alt={`${category} «${name}»`} />
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
          <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{returnFormatedPrice(price)} ₽</p>
        </div>
      </div>
      <div className="modal__buttons">
        <button
          ref={focusElement}
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
        >
          <svg width={24} height={16} aria-hidden="true">
            <use xlinkHref="#icon-add-basket"></use>
          </svg>Добавить в корзину
        </button>
      </div>
    </>
  );
}

const AddItemPopup = memo(AddItemPopupComponent);
export default AddItemPopup;
