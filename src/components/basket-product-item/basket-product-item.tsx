import { ChangeEvent } from 'react';
import { Camera, CameraBasket } from '../../types/types';
import { returnFormatedPrice } from '../../utils/common';
import BasketProductCardInfo from '../basket-product-card-info/basket-product-card-info';
import BasketProductCount from '../basket-product-count/basket-product-count';

type BasketProductItemProps = {
  camera: CameraBasket;
  onRemoveClick: (camera: Camera) => void;
  onIncreaseButtonClick: (id: CameraBasket['id']) => void;
  onDecreaseButtonClick: (id: CameraBasket['id']) => void;
  onCountChange: (event: ChangeEvent<HTMLInputElement>, id: CameraBasket['id']) => void;
}

function BasketProductItem({camera, onRemoveClick, onIncreaseButtonClick, onDecreaseButtonClick, onCountChange }: BasketProductItemProps): JSX.Element {
  const {id, count, price} = camera;
  return(
    <li className="basket-item">
      <BasketProductCardInfo camera={camera} screenType={'basket'} />
      <BasketProductCount
        count={count}
        id={id}
        onIncreaseButtonClick={onIncreaseButtonClick}
        onDecreaseButtonClick={onDecreaseButtonClick}
        onCountChange={onCountChange}
      />
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>{returnFormatedPrice(count * price)}
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={() => onRemoveClick(camera)}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}

export default BasketProductItem;
