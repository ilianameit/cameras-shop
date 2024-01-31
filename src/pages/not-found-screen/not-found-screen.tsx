import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

function NotFoundScreen():JSX.Element {
  return(
    <div className="wrapper">
      <Helmet>
        <title>Can`t found: 404</title>
      </Helmet>
      <Header />
      <main className="decorated-page quest-page">
        404
      </main>
      <Footer />
    </div>
  );
}
export default NotFoundScreen;
