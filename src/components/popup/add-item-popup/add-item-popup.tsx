import { RefObject, memo, useEffect } from 'react';
import { Camera } from '../../../types/types';
import { useAppDispatch } from '../../../hooks';
import BasketProductCardInfo from '../../basket-product-card-info/basket-product-card-info';
import NotFoundScreen from '../../../pages/not-found-screen/not-found-screen';
import { addToCart } from '../../../store/basket-slice/basket-slice';

type AddItemPopupComponentProps = {
  camera: Camera | null;
  focusElement: RefObject<HTMLButtonElement>;
  onAddTocartClick: () => void;
}

function AddItemPopupComponent({camera, focusElement, onAddTocartClick}: AddItemPopupComponentProps): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (focusElement && focusElement.current) {
      focusElement.current.focus();
    }
  }, [focusElement]);

  if (!camera) {
    return <NotFoundScreen />;
  }

  function handleAddToCart() {
    if (camera) {
      dispatch(addToCart(camera));
      onAddTocartClick();
    }
  }

  return(
    <>
      <div className="basket-item basket-item--short">
        <BasketProductCardInfo camera={camera} screenType={'addItem'} />
      </div>
      <div className="modal__buttons">
        <button
          ref={focusElement}
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          onClick={handleAddToCart}
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
