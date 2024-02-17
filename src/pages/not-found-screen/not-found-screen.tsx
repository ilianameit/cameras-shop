import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const/const';
import { memo } from 'react';

function NotFoundScreenComponent():JSX.Element {
  return(
    <div className="wrapper">
      <Helmet>
        <title>Can`t found: 404</title>
      </Helmet>
      <Header />
      <main className="decorated-page quest-page">
        <h1 className='title.title--h1'>404</h1>
        <hr />
        <br/>
        <Link className="btn btn--transparent" to={AppRoutes.Root}>Вернуться на главную</Link>
      </main>
      <Footer />
    </div>
  );
}

const NotFoundScreen = memo(NotFoundScreenComponent);
export default NotFoundScreen;
