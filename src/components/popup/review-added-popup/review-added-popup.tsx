import ModalWindow from '../../modal-window/modal-window';
import ThanksPopup from '../thanks-popup/thanks-popup';

type ReviewAddedPopupProps = {
  onClose: () => void;
}

function ReviewAddedPopup({onClose}: ReviewAddedPopupProps): JSX.Element {
  return(
    <ModalWindow title={'Спасибо за отзыв'} onClose={onClose} isResponse>
      <ThanksPopup />
    </ModalWindow>
  );
}

export default ReviewAddedPopup;
