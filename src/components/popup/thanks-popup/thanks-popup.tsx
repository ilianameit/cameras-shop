import { Fragment, RefObject, memo, useEffect } from 'react';
import { AppRoutes } from '../../../const/const';
import { useNavigate } from 'react-router-dom';

type ThanksPopupComponentProps = {
  focusElement: RefObject<HTMLButtonElement>;
}

function ThanksPopupComponent({focusElement}: ThanksPopupComponentProps): JSX.Element {
  const navigate = useNavigate();

  function handleReturnButtonClick() {
    navigate(AppRoutes.Root);
  }

  useEffect(() => {
    if (focusElement && focusElement.current) {
      focusElement.current.focus();
    }
  }, [focusElement]);

  return(
    <Fragment>
      <svg className="modal__icon" width="80" height="78" aria-hidden="true">
        <use xlinkHref="#icon-review-success"></use>
      </svg>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          onClick={handleReturnButtonClick}
          ref={focusElement}
        >
          Вернуться к покупкам
        </button>
      </div>
    </Fragment>
  );
}

const ThanksPopup = memo(ThanksPopupComponent);
export default ThanksPopup;
