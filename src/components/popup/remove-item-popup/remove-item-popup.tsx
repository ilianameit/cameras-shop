import { Fragment, MouseEvent, RefObject, useEffect } from 'react';
import { Camera } from '../../../types/types';
import BasketProductCardInfo from '../../basket-product-card-info/basket-product-card-info';
import NotFoundScreen from '../../../pages/not-found-screen/not-found-screen';

type RemoveItemPopupProps = {
  camera: Camera | null;
  focusElement: RefObject<HTMLButtonElement>;
  onDeleteButtonClick: (id: Camera['id']) => void;
  onContinueButtonClick: (evt: MouseEvent<HTMLAnchorElement>) => void;
}
function RemoveItemPopup({camera, focusElement, onDeleteButtonClick, onContinueButtonClick}: RemoveItemPopupProps): JSX.Element {
  useEffect(() => {
    if (focusElement && focusElement.current) {
      focusElement.current.focus();
    }
  }, [focusElement]);

  if(!camera) {
    return(
      <NotFoundScreen />
    );
  }

  return(
    <Fragment>
      <div className="basket-item basket-item--short">
        {
          <BasketProductCardInfo camera={camera} screenType={'removeItem'} />
        }
      </div>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--half-width"
          type="button"
          ref={focusElement}
          onClick={() => onDeleteButtonClick(camera.id)}
        >
          Удалить
        </button>
        <a
          className="btn btn--transparent modal__btn modal__btn--half-width"
          href="#"
          onClick={(evt) => onContinueButtonClick(evt)}
        >
          Продолжить покупки
        </a>
      </div>
    </Fragment>
  );
}

export default RemoveItemPopup;
