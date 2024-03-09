import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import CardsList from '../../components/cards-list/cards-list';
import { useAppSelector } from '../../hooks';
import { getFilteredCameras, getSortedCameras } from '../../store/camera-slice/selectors';
import Banner from '../../components/banner/banner';
import Pagination from '../../components/pagination/pagination';
import { useSearchParams } from 'react-router-dom';
import { ChangeEvent, KeyboardEvent, memo, useCallback, useMemo, useState } from 'react';
import AddItemPopup from '../../components/popup/add-item-popup/add-item-popup';
import { AppRoutes, NAME_KEY_ENTER } from '../../const/const';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { Breadcrumb, Camera, SortTypeBy, SortTypeName, CameraCategory, CameraType, CameraLevel, Filters, KeyFilters } from '../../types/types';
import ModalWindow from '../../components/modal-window/modal-window';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';

const MAX_COUNT_ITEM_PAGE = 9;

type Params = {
  page: string;
  sort?: SortTypeName | '' | 'null';
  dir?: SortTypeBy | '' | 'null';
  cat?: string;
  type?: string ;
  lvl?: string;
}

function CatalogScreenComponent(): JSX.Element {

  const [searchParams, setSearchParams] = useSearchParams();

  const filterCategory: CameraCategory | '' = searchParams.get('cat') as CameraCategory | '';
  const filterType: CameraType | '' = searchParams.get('type') as CameraType | '';
  const filterLevel: CameraLevel | '' = searchParams.get('lvl') as CameraLevel | '';

  const sortTypeName: SortTypeName | '' | 'null' = searchParams.get('sort') as SortTypeName | '' | 'null';
  const sortTypeBy: SortTypeBy | '' | 'null' = searchParams.get('dir') as SortTypeBy | '' | 'null';

  const filteredCameras = useAppSelector((state) => getFilteredCameras(state, filterCategory, filterType, filterLevel));
  const cameras = getSortedCameras(filteredCameras, sortTypeName, sortTypeBy);

  const currentPage = useMemo(() => Number(searchParams.get('page') || 1), [searchParams]);
  const beginItem = useMemo(() => (currentPage - 1) * MAX_COUNT_ITEM_PAGE, [currentPage]);
  const endItem = useMemo(() => currentPage * MAX_COUNT_ITEM_PAGE, [currentPage]);

  function getParams() {
    return {
      page: '1',
      sort: sortTypeName,
      dir: sortTypeBy,
      cat: filterCategory,
      type: filterType,
      lvl: filterLevel,
    };
  }

  const params: Params = getParams();

  const handleFilterChange = (evt: ChangeEvent<HTMLInputElement>, filter: Filters, key: KeyFilters) => {
    const target = evt.target;

    if(target.checked) {
      params[key] = filter;
    } else {
      delete params[key];
    }
    setSearchParams(params);
  };

  const handleResetFilterClick = () => {
    delete params.cat;
    delete params.type;
    delete params.lvl;
    setSearchParams(params);
  };

  const handleFilterChangeKeyDown = (event: KeyboardEvent<HTMLInputElement>, filter: Filters, key: KeyFilters) => {
    if (event.code === NAME_KEY_ENTER) {
      params[key] = filter;
      setSearchParams(params);
    }
  };

  const handleSortTypeNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    params.sort = evt.target.id as SortTypeName;

    if(!sortTypeBy || sortTypeBy === 'null') {
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
                <CatalogFilter
                  onFilterChange = {handleFilterChange}
                  onResetFilterClick = {handleResetFilterClick}
                  filterCategory = {filterCategory}
                  filterType = {filterType}
                  filterLevel = {filterLevel}
                  onFilterChangeKeyDown = {handleFilterChangeKeyDown}

                />
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
