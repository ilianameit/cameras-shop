import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { AppRoutes } from '../../const/const';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import BasketScreen from '../../pages/basket-screen/basket-screen';
import ProductScreen from '../../pages/product-screen/product-screen';
import { useAppSelector } from '../../hooks';
import { getStatusLoadingCameras } from '../../store/camera-slice/selectors';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

function App(): JSX.Element {
  const loading = useAppSelector(getStatusLoadingCameras);

  if(loading) {
    return <LoadingScreen />;
  }

  return(
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path={AppRoutes.Root} element={<CatalogScreen />}/>
          <Route path={AppRoutes.Basket} element={<BasketScreen />} />
          <Route path={`${AppRoutes.Product}:id`} element={<ProductScreen />} />
          <Route path='*' element={<NotFoundScreen />} />

        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
