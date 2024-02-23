import { memo, useMemo } from 'react';
import { Description } from '../../../types/types';

type DescriptionTabContentProps = {
  description: Description;
}

function DescriptionTabContentComponent({description}: DescriptionTabContentProps): JSX.Element {
  const splitedDescription = useMemo(() => description.split('. '), [description]);
  return(
    <div className="product__tabs-text" data-testid='text-description'>
      {splitedDescription.map((paragraph, index) => (
        <p key={paragraph}>
          {paragraph}
          {index < splitedDescription.length - 1 ? '.' : ''}
        </p>
      ))}
    </div>
  );
}

const DescriptionTabContent = memo(DescriptionTabContentComponent);
export default DescriptionTabContent;
