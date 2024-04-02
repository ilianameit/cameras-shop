import { ChangeEvent, useRef } from 'react';
import { CameraBasket } from '../../types/types';
import { MAX_COUNT_ITEM_BASKET, MIN_COUNT_ITEM_BASKET } from '../../const/const';

type BasketProductCountProps = {
  count: number;
  id: CameraBasket['id'];
  onIncreaseButtonClick: (id: CameraBasket['id']) => void;
  onDecreaseButtonClick: (id: CameraBasket['id']) => void;
  onCountChange: (event: ChangeEvent<HTMLInputElement>, id: CameraBasket['id']) => void;
}


function BasketProductCount({count, id, onIncreaseButtonClick, onDecreaseButtonClick, onCountChange}: BasketProductCountProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputClick = () => {
    const input = inputRef.current;
    if (input) {
      input.select();
    }
  };

  return(
    <div className="quantity">
      <button
        className="btn-icon btn-icon--prev"
        aria-label="уменьшить количество товара"
        onClick={() => onDecreaseButtonClick(id)}
        disabled={count <= MIN_COUNT_ITEM_BASKET}
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
      <label className="visually-hidden" htmlFor="counter1"></label>
      <input
        type="number"
        id="counter1"
        value={count}
        min={MIN_COUNT_ITEM_BASKET}
        max={MAX_COUNT_ITEM_BASKET}
        aria-label="количество товара"
        onChange={(evt) => onCountChange(evt,id)}
        ref={inputRef}
        onClick={handleInputClick}
      />
      <button
        className="btn-icon btn-icon--next"
        aria-label="увеличить количество товара"
        onClick={() => onIncreaseButtonClick(id)}
        disabled={count >= MAX_COUNT_ITEM_BASKET}
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
    </div>
  );
}

export default BasketProductCount;
