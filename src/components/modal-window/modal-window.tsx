import classNames from 'classnames';
import { ReactNode, KeyboardEvent, memo, useEffect } from 'react';
import { createPortal } from 'react-dom';

type ModalWindowProps = {
  title: string;
  isResponse?: boolean;
  onClose: () => void;
  children: ReactNode;
}

function ModalWindowComponent({title, onClose, children, isResponse = false}: ModalWindowProps): JSX.Element{
  useEffect(() => {
    document.body.classList.add('scroll-lock');
    return () => {
      document.body.classList.remove('scroll-lock');
    };
  });


  function handleEscapeKeyDown(evt: KeyboardEvent<HTMLDivElement>) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      onClose();
    }
  }

  return (
    <>
      {
        createPortal(
          <div
            className={
              classNames(
                'modal',
                'is-active',
                {'modal--narrow': isResponse}
              )
            }
            tabIndex={0}
            onKeyDown={handleEscapeKeyDown}
          >
            <div className="modal__wrapper">
              <div
                className="modal__overlay"
                onClick={onClose}
                data-testid="modal"
              >
              </div>
              <div
                className="modal__content"
                onClick={(event) => event.stopPropagation()}
              >
                <p className="title title--h4">{title}</p>
                {children}
                <button
                  className="cross-btn"
                  type="button"
                  aria-label="Закрыть попап"
                  onClick={onClose}
                >
                  <svg width="10" height="10" aria-hidden="true">
                    <use xlinkHref="#icon-close"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          , document.body
        )
      }
    </>
  );
}

const ModalWindow = memo(ModalWindowComponent);
export default ModalWindow;
