import { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsModalActiveStatus } from '../../store/app-slice/selectors';
import classNames from 'classnames';
import { setActiveModal } from '../../store/app-slice/app-slice';

type ModalWindowProps = {
  children: ReactNode;
}
function ModalWindow({children}: ModalWindowProps): JSX.Element {
  const dispath = useAppDispatch();

  function handleCloseClick() {
    dispath(setActiveModal());
  }


  const isActiveModal = useAppSelector(getIsModalActiveStatus);
  return(
    <div className={
      classNames(
        'modal',
        {'is-active': isActiveModal}
      )
    }
    >
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={handleCloseClick}
        >
        </div>
        <div className="modal__content">
          {children}
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={handleCloseClick}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalWindow;
