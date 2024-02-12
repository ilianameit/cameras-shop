import { Camera } from '../../types/types';
import CardItem from '../card-item/card-item';

type CardListProps = {
  cameras: Camera[];
  onBuyClick: () => void;
}

function CardsList({cameras, onBuyClick}: CardListProps): JSX.Element {
  return(
    <div className="cards catalog__cards">
      {
        cameras.map((camera) => (
          <CardItem key={`${camera.id}-camera`} camera={camera} onBuyClick={onBuyClick}/>
        ))
      }
    </div>
  );
}

export default CardsList;
