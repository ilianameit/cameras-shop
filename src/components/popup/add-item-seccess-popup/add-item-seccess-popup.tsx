import { Fragment, MouseEvent, RefObject, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../const/const';

type AddItemSeccessPopupProps = {
  focusElement: RefObject<HTMLAnchorElement>;
  onContinueButtonClick: () => void;
  isCardItem: boolean;
}

function AddItemSeccessPopup({focusElement, onContinueButtonClick, isCardItem}: AddItemSeccessPopupProps): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    if (focusElement && focusElement.current) {
      focusElement.current.focus();
    }
  }, [focusElement]);

  function handleReturnButtonClick() {
    onContinueButtonClick();
    navigate(AppRoutes.Basket);
  }

  function handleContinueButtonClick(evt: MouseEvent<HTMLAnchorElement>) {
    evt.preventDefault();
    onContinueButtonClick();
    if(isCardItem) {
      navigate(AppRoutes.Root);
    }
  }
  return(
    <Fragment>
      <svg className="modal__icon" width="86" height="80" aria-hidden="true">
        <use xlinkHref="#icon-success"></use>
      </svg>
      <div className="modal__buttons">
        <a
          className="btn btn--transparent modal__btn"
          ref={focusElement}
          onClick={handleContinueButtonClick}
          href='#'
        >
          Продолжить покупки
        </a>
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          onClick={handleReturnButtonClick}
        >
          Перейти в корзину
        </button>
      </div>
    </Fragment>
  );
}

export default AddItemSeccessPopup;
