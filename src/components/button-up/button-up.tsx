import { memo } from 'react';

function ButtonUpComponent(): JSX.Element {

  function handleButtonUpClick() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  return(
    <a className="up-btn" onClick={handleButtonUpClick}>
      <svg width={12} height={18} aria-hidden="true">
        <use xlinkHref="#icon-arrow2"></use>
      </svg>
    </a>
  );
}

const ButtonUp = memo(ButtonUpComponent);
export default ButtonUp;
