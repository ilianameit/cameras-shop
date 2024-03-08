import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import CardsList from '../../components/cards-list/cards-list';
import { useAppSelector } from '../../hooks';
import { getSortedCameras } from '../../store/camera-slice/selectors';
import Banner from '../../components/banner/banner';
import Pagination from '../../components/pagination/pagination';
import { useSearchParams } from 'react-router-dom';
import { ChangeEvent, memo, useCallback, useMemo, useState } from 'react';
import AddItemPopup from '../../components/popup/add-item-popup/add-item-popup';
import { AppRoutes } from '../../const/const';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { Breadcrumb, Camera, SortTypeBy, SortTypeName } from '../../types/types';
import ModalWindow from '../../components/modal-window/modal-window';
import CatalogSort from '../../components/catalog-sort/catalog-sort';

const MAX_COUNT_ITEM_PAGE = 9;

type Params = {
  page: string;
  sort?: SortTypeName | '';
  dir?: SortTypeBy | '';
}

function CatalogScreenComponent(): JSX.Element {

  const [searchParams, setSearchParams] = useSearchParams();

  const sortTypeName: SortTypeName | '' = searchParams.get('sort') as SortTypeName | '';
  const sortTypeBy: SortTypeBy | '' = searchParams.get('dir') as SortTypeBy | '';

  const cameras = useAppSelector((state) => getSortedCameras(state, sortTypeName, sortTypeBy));

  const currentPage = useMemo(() => Number(searchParams.get('page') || 1), [searchParams]);
  const beginItem = useMemo(() => (currentPage - 1) * MAX_COUNT_ITEM_PAGE, [currentPage]);
  const endItem = useMemo(() => currentPage * MAX_COUNT_ITEM_PAGE, [currentPage]);

  function getParams() {
    return {
      page: String(currentPage),
      sort: sortTypeName,
      dir: sortTypeBy,
    };
  }

  const params: Params = getParams();

  const handleSortTypeNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    params.sort = evt.target.id as SortTypeName;

    if(!sortTypeBy) {
      params.dir = 'up';
    }
    setSearchParams(params);
  };

  const handleSortTypeByChange = (evt: ChangeEvent<HTMLInputElement>) => {
    params.dir = evt.target.id as SortTypeBy;

    if(!sortTypeName) {
      params.sort = 'sortPrice';
    }
    setSearchParams(params);
  };

  const currentCameras = useMemo(() => cameras.slice(beginItem, endItem), [beginItem, cameras, endItem]);

  const handlePaginateClick = useCallback((pageNumber: number) =>{
    params.page = String(pageNumber);
    setSearchParams(params);
  }, [params, setSearchParams]);

  const [showModal, setShowModal] = useState(false);
  const [cameraCard, setCameraCard] = useState<Camera | null>(null);

  const handleBuyClick = useCallback((camera: Camera) => {
    setShowModal(true);
    setCameraCard(camera);
  }, []);
  const handleCloseBuyItemClick = useCallback(() => setShowModal(false), []);

  const breadcrumbsScreen: Breadcrumb[] = [{title: 'Главная', href: AppRoutes.Root}, {title: 'Каталог'}];

  return(
    <div className="wrapper">
      <Helmet>
        <title>Catalog</title>
      </Helmet>
      <Header />
      <main>
        <Banner />
        <div className="page-content">
          <Breadcrumbs breadcrumbs={breadcrumbsScreen} />
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <div className="catalog-filter">
                    <form action="#">
                      <h2 className="visually-hidden">Фильтр</h2>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Цена, ₽</legend>
                        <div className="catalog-filter__price-range">
                          <div className="custom-input">
                            <label>
                              <input type="number" name="price" placeholder="от" />
                            </label>
                          </div>
                          <div className="custom-input">
                            <label>
                              <input type="number" name="priceUp" placeholder="до"/>
                            </label>
                          </div>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Категория</legend>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="photocamera" /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Фотокамера</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="videocamera" /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Видеокамера</span>
                          </label>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Тип камеры</legend>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="digital" /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Цифровая</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="film" disabled /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Плёночная</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="snapshot" /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Моментальная</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="collection" disabled /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Коллекционная</span>
                          </label>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Уровень</legend>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="zero" /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Нулевой</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="non-professional" /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Любительский</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="professional" /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Профессиональный</span>
                          </label>
                        </div>
                      </fieldset>
                      <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
                      </button>
                    </form>
                  </div>
                </div>
                <div className="catalog__content">
                  <CatalogSort sortTypeName={sortTypeName} onSortTypeNameChange={handleSortTypeNameChange} sortTypeBy={sortTypeBy} onSortTypeByChange={handleSortTypeByChange} />
                  <CardsList cameras={currentCameras} onBuyClick={handleBuyClick}/>
                  {
                    cameras.length > MAX_COUNT_ITEM_PAGE &&
                    <Pagination currentPage={currentPage} totalItems={cameras.length} itemsPerPage={MAX_COUNT_ITEM_PAGE} onPageClick={handlePaginateClick}/>
                  }
                </div>
              </div>
            </div>
          </section>
        </div>
        {
          showModal && (
            <ModalWindow
              title='Добавить товар в корзину'
              onClose={handleCloseBuyItemClick}
            >
              <AddItemPopup camera={cameraCard}/>
            </ModalWindow>)
        }
      </main>
      <Footer />
    </div>
  );
}

const CatalogScreen = memo(CatalogScreenComponent);
export default CatalogScreen;
