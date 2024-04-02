import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const/const';
import { memo } from 'react';
import FormSearch from '../form-search/form-search';
import { getCamerasFromCart } from '../../store/camera-slice/selectors';
import { useAppSelector } from '../../hooks';

function HeaderComponent(): JSX.Element {
  const cameras = useAppSelector(getCamerasFromCart);
  return(
    <header className="header" id="header">
      <div className="container">
        <Link className="header__logo" to={AppRoutes.Root} aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoutes.Root}>Каталог</Link>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="#">Гарантии</a>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="#">Доставка</a>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="#">О компании</a>
            </li>
          </ul>
        </nav>
        <FormSearch />
        <Link className="header__basket-link" to={AppRoutes.Basket} aria-label="Корзина">
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          {
            cameras.length > 0 && <span className="header__basket-count">{cameras.length}</span>
          }
        </Link>
      </div>
    </header>
  );
}

const Header = memo(HeaderComponent);
export default Header;
