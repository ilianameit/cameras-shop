import { memo, useEffect, useRef } from 'react';

function AddItemPopupComponent(): JSX.Element {
  const focusElement = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (focusElement.current) {
      focusElement.current.focus();
    }
  }, [focusElement]);
  return(
    <>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source type="image/webp" srcSet="/img/content/orlenok.webp, /img/content/orlenok@2x.webp 2x" />
            <img src="/img/content/orlenok.jpg" srcSet="/img/content/orlenok@2x.jpg 2x" width={140} height={120} alt="Фотоаппарат «Орлёнок»" />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">Орлёнок</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">O78DFGSD832</span>
            </li>
            <li className="basket-item__list-item">Плёночная фотокамера</li>
            <li className="basket-item__list-item">Любительский уровень</li>
          </ul>
          <p className="basket-item__price"><span className="visually-hidden">Цена:</span>18 970 ₽</p>
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
