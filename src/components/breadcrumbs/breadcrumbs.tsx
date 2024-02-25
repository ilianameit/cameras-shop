import { Link } from 'react-router-dom';
import { Breadcrumb } from '../../types/types';

type BreadcrumbsProps = {
  breadcrumbs: Breadcrumb[];
}

function Breadcrumbs({breadcrumbs}: BreadcrumbsProps): JSX.Element{
  return(
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list" data-testid='breadcrumbs'>
          {breadcrumbs.map((breadcrumb) => (
            <li
              key={breadcrumb.title}
              className="breadcrumbs__item"
            >
              {breadcrumb.href ? (
                <Link
                  className="breadcrumbs__link"
                  to={breadcrumb.href}
                >
                  {breadcrumb.title}
                  <svg width={5} height={8} aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini"></use>
                  </svg>
                </Link>
              ) : (
                <span className="breadcrumbs__link breadcrumbs__link--active">{breadcrumb.title}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumbs;
