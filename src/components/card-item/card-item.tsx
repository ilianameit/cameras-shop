import { Camera } from '../../types/types';
import classNames from 'classnames';
import DefaultCardItem from './default-card-item';

type CardItemProps = {
  camera: Camera;
  onBuyClick: () => void;
  isSwiperCard?: boolean;
}

function CardItem({camera, onBuyClick, isSwiperCard = false}: CardItemProps): JSX.Element{

  function handleBuyClick() {
    onBuyClick();
  }

  if(isSwiperCard) {
    return(
      <DefaultCardItem camera={camera} onBuyClick={handleBuyClick} />
    );
  }
  return (
    <div className={
      classNames(
        'product-card',
      )
    }
    >
      <DefaultCardItem camera={camera} onBuyClick={handleBuyClick} />
    </div>
  );

}

export default CardItem;
