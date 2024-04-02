import { Camera } from '../../types/types';
import BasketProductCardInfo from '../basket-product-card-info/basket-product-card-info';

type BasketProductItemProps = {
  camera: Camera;
  onDeleteButtonClick: (id: Camera['id']) => void;

}
function BasketProductItem({camera, onDeleteButtonClick}: BasketProductItemProps): JSX.Element {
  const {previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, category, name, vendorCode} = camera;
  return(
    <li className="basket-item">
      <BasketProductCardInfo camera={camera} screenType={'basket'} />
      <div className="quantity">
        <button className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара">
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input type="number" id="counter1" value="1" min="1" max="99" aria-label="количество товара" />
        <button className="btn-icon btn-icon--next" aria-label="увеличить количество товара">
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>37 940 ₽</div>
      <button className="cross-btn" type="button" aria-label="Удалить товар">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}

export default BasketProductItem;
