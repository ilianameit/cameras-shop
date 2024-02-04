import { Camera } from '../../types/types';
import CardItem from '../card-item/card-item';

type CardListProps = {
  cameras: Camera[];
}

function CardsList({cameras}: CardListProps): JSX.Element {
  return(
    <div className="cards catalog__cards">
      {
        cameras.map((camera) => (
          <CardItem key={`${camera.id}-camera`} camera={camera}/>
        ))
      }
    </div>
  );
}

export default CardsList;
