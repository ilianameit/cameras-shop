import { Description } from '../../../types/types';

type DescriptionTabContentProps = {
  description: Description;
}

function DescriptionTabContent({description}: DescriptionTabContentProps): JSX.Element {
  const splitedDescription = description.split('. ');
  return(
    <div className="product__tabs-text">
      {splitedDescription.map((paragraph, index) => (
        <p key={paragraph}>
          {paragraph}
          {index < splitedDescription.length - 1 ? '.' : ''}
        </p>
      ))}
    </div>
  );
}

export default DescriptionTabContent;
