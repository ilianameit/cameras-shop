import { memo } from 'react';
import { FeatureItem } from '../../../types/types';

type FeatureTabContentProps = {
 vendorCode: FeatureItem['vendorCode'];
 category: FeatureItem['category'];
 type: FeatureItem['type'];
 level: FeatureItem['level'];
}
function FeatureTabContentComponent({vendorCode, category, type, level}: FeatureTabContentProps): JSX.Element {
  return(
    <ul className="product__tabs-list">
      <li className="item-list"><span className="item-list__title">Артикул:</span>
        <p className="item-list__text"> {vendorCode}</p>
      </li>
      <li className="item-list"><span className="item-list__title">Категория:</span>
        <p className="item-list__text">{category}</p>
      </li>
      <li className="item-list"><span className="item-list__title">Тип камеры:</span>
        <p className="item-list__text">{type}</p>
      </li>
      <li className="item-list"><span className="item-list__title">Уровень:</span>
        <p className="item-list__text">{level}</p>
      </li>
    </ul>
  );
}

const FeatureTabContent = memo(FeatureTabContentComponent);
export default FeatureTabContent;
