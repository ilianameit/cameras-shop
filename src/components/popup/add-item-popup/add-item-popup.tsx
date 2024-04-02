import { RefObject, memo, useEffect, useRef } from 'react';
import { Camera } from '../../../types/types';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getAddToCartSuccessStatus } from '../../../store/camera-slice/selectors';
import ModalWindow from '../../modal-window/modal-window';

import { addToCart, changeStatusAddToCart } from '../../../store/camera-slice/camera-slice';
import AddItemSeccessPopup from '../add-item-seccess-popup/add-item-seccess-popup';
import BasketProductCardInfo from '../../basket-product-card-info/basket-product-card-info';

type AddItemPopupComponentProps = {
  camera: Camera | null;
  focusElement: RefObject<HTMLButtonElement>;
  onClose: () => void;
  isCardItem: boolean;
}

function AddItemPopupComponent({camera, focusElement, onClose, isCardItem}: AddItemPopupComponentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isAddToCartSuccess = useAppSelector(getAddToCartSuccessStatus);

  const focusItemSuccessPopup = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (focusElement && focusElement.current) {
      focusElement.current.focus();
    }
  }, [focusElement]);

  if (!camera) {
    return <div>Loading...</div>;
  }

  function handleAddToCart() {
    if (camera) {
      dispatch(addToCart(camera));
    }
  }

  function handleCloseModal() {
    if(isCardItem) {
      onClose();
    }
    dispatch(changeStatusAddToCart());
  }

  function handleContinueButtonClick() {
    onClose();
    dispatch(changeStatusAddToCart());
  }

  return(
    isAddToCartSuccess ?
      <ModalWindow title={'Товар успешно добавлен в корзину'} onClose={handleCloseModal} firstFocusElement={focusItemSuccessPopup} isResponse>
        <AddItemSeccessPopup focusElement={focusItemSuccessPopup} onContinueButtonClick={handleContinueButtonClick} isCardItem={isCardItem}/>
      </ModalWindow> :
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
