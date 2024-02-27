import { Camera } from '../../types/types';
import classNames from 'classnames';
import DefaultCardItem from './default-card-item';
import { memo, useCallback } from 'react';

type CardItemProps = {
  camera: Camera;
  onBuyClick: (camera: Camera) => void;
  isSwiperCard?: boolean;
}

function CardItemComponent({camera, onBuyClick, isSwiperCard = false}: CardItemProps): JSX.Element{

  const handleBuyClick = useCallback(() => {
    onBuyClick(camera);
  }, [camera, onBuyClick]);

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

const CardItem = memo(CardItemComponent);
export default CardItem;
