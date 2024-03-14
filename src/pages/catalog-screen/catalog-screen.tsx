import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import CardsList from '../../components/cards-list/cards-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCameras, getFilteredCameras, getPriceFilteredCameras, getSortedCameras } from '../../store/camera-slice/selectors';
import Banner from '../../components/banner/banner';
import Pagination from '../../components/pagination/pagination';
import { useSearchParams } from 'react-router-dom';
import { ChangeEvent, FocusEvent, KeyboardEvent, memo, useCallback, useEffect, useMemo, useState } from 'react';
import AddItemPopup from '../../components/popup/add-item-popup/add-item-popup';
import { AppRoutes, NAME_KEY_ENTER } from '../../const/const';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { Breadcrumb, Camera, SortTypeBy, SortTypeName, CameraCategory, CameraType, CameraLevel, Filters, KeyFilters, InitialPriceType, PriceFilterType } from '../../types/types';
import ModalWindow from '../../components/modal-window/modal-window';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import { fetchCamerasPriceAction } from '../../store/api-actions';
import EmptyListProducts from '../../components/empty-list-products/empty-list-products';

const MAX_COUNT_ITEM_PAGE = 9;

type Params = {
  page: string;
  sort?: SortTypeName | '' | 'null';
  dir?: SortTypeBy | '' | 'null';
  cat?: string | undefined ;
  type?: string | undefined;
  lvl?: string | undefined;
}

function CatalogScreenComponent(): JSX.Element {
  const dispatch = useAppDispatch();
  const totalCameras = useAppSelector(getCameras);

  const [searchParams, setSearchParams] = useSearchParams();

  const filterCategory: CameraCategory | '' | undefined | string = searchParams.get('cat') as CameraCategory | '' | undefined | string;
  const filterType: CameraType | '' | undefined | string = searchParams.get('type') as CameraType | '' | undefined | string;
  const filterLevel: CameraLevel | '' | undefined | string = searchParams.get('lvl') as CameraLevel | '' | undefined | string;

  const sortTypeName: SortTypeName | '' | 'null' = searchParams.get('sort') as SortTypeName | '' | 'null';
  const sortTypeBy: SortTypeBy | '' | 'null' = searchParams.get('dir') as SortTypeBy | '' | 'null';


  const [camerasByPriceRange, setCamerasByPriceRange] = useState<Camera[]>(totalCameras);

  const filteredCameras = getFilteredCameras(camerasByPriceRange, filterCategory, filterType, filterLevel);
  const sortedPriceCameras = getSortedCameras(filteredCameras, 'sortPrice', 'up');

  const initialPrice = {
    from: sortedPriceCameras.length ? sortedPriceCameras[0].price : 0,
    to: sortedPriceCameras.length ? sortedPriceCameras[sortedPriceCameras.length - 1].price : 0,
  };


  const [filterPrice, setFilterPrice] = useState<InitialPriceType>(initialPrice);


  useEffect(() => {
    dispatch(fetchCamerasPriceAction(filterPrice));
  }, [dispatch, filterPrice]);

  const cameras = getSortedCameras(sortedPriceCameras, sortTypeName, sortTypeBy);

  const camerasFilteredByPriceRange = useAppSelector(getPriceFilteredCameras);
  useEffect(() => {
    setCamerasByPriceRange(camerasFilteredByPriceRange);
  }, [camerasFilteredByPriceRange]);


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

  const [filterPriceValue, setFilterPriceValue] = useState<InitialPriceType>({from: 0, to: 0});
  const [initialPriceValueFilter, setInitialPriceValueFilter] = useState<InitialPriceType>(initialPrice);
  let isReset = false;

  function handleChangeFilterPrice(event: FocusEvent<HTMLInputElement>, key: PriceFilterType) {
    const value = Number(event.target.value);
    if(value > 0 && event.target.value) {
      if(key === 'from' && value < initialPriceValueFilter.from) {

        setFilterPriceValue({...filterPriceValue, from: initialPriceValueFilter.from});
      } else if(key === 'to' && value > initialPriceValueFilter.to) {

        setFilterPriceValue({...filterPriceValue, to: initialPriceValueFilter.to});
      } else if(key === 'to' && value < initialPriceValueFilter.from) {

        setFilterPriceValue({ ...filterPriceValue, [key]: 0 });
        setFilterPrice({...filterPrice, [key]: initialPriceValueFilter[key]});
      } else{

        setFilterPriceValue({ ...filterPriceValue, [key]: value });
        setFilterPrice({ ...filterPrice, [key]: value });
      }
    }
    if(value === 0 && !event.target.value) {
      setFilterPrice({...filterPrice, [key]: initialPriceValueFilter[key]});
    }

  }

  function handleChangeSetFilterPriceValue(event: ChangeEvent<HTMLInputElement>, key: PriceFilterType) {
    setFilterPriceValue({...filterPriceValue, [key]: Number(event.target.value)});
  }

  const updateFilters = (updatedParams: Params) => {
    const newFilteredCameras = getFilteredCameras(totalCameras, updatedParams.cat, updatedParams.type, updatedParams.lvl);
    const newSortedPriceCameras = getSortedCameras(newFilteredCameras, 'sortPrice', 'up');

    const newFilterPrice = {
      from: newSortedPriceCameras.length ? newSortedPriceCameras[0].price : 0,
      to: newSortedPriceCameras.length ? newSortedPriceCameras[newSortedPriceCameras.length - 1].price : 0,
    };

    if(filterPriceValue.from) {

      if(filterPriceValue.from < newFilterPrice.from || filterPriceValue.from > newFilterPrice.to) {
        setFilterPriceValue({ ...filterPriceValue, from: newFilterPrice.from });
        setFilterPrice({...filterPrice, from: newFilterPrice.from});
      } else {
        setFilterPrice({...filterPrice, from: filterPriceValue.from});
      }

      if(filterPriceValue.from && !filterPriceValue.to) {
        setFilterPrice({...filterPrice, to: newFilterPrice.to});
      }
    }

    if(filterPriceValue.to) {

      if(filterPriceValue.to < newFilterPrice.from || filterPriceValue.to > newFilterPrice.to) {
        setFilterPriceValue({ ...filterPriceValue, to: newFilterPrice.to });
        setFilterPrice({...filterPrice, to: newFilterPrice.to});
      } else {
        setFilterPrice({...filterPrice, to: filterPriceValue.to});
      }

      if(filterPriceValue.to && !filterPriceValue.from) {
        setFilterPrice({...filterPrice, from: newFilterPrice.from});
      }
    }

    if(filterPriceValue.from && filterPriceValue.to) {

      if(filterPriceValue.from >= newFilterPrice.from && filterPriceValue.from <= newFilterPrice.to && filterPriceValue.to <= newFilterPrice.to && filterPriceValue.to >= newFilterPrice.from){
        setFilterPrice(filterPriceValue);
      } else {
        setFilterPrice({...filterPrice, from: newFilterPrice.from, to: newFilterPrice.to});
        setFilterPriceValue({...filterPriceValue, from: newFilterPrice.from, to: newFilterPrice.to});
      }
    }

    if(!filterPriceValue.from && !filterPriceValue.to) {
      setFilterPrice(newFilterPrice);
    }

    if(isReset) {
      setFilterPrice(newFilterPrice);
      isReset = false;
    }
    setInitialPriceValueFilter(newFilterPrice);
  };

  const handleFilterChange = (evt: ChangeEvent<HTMLInputElement>, filter: Filters, key: KeyFilters) => {
    const target = evt.target;
    const updatedParams = { ...params };

    if(target.checked) {
      updatedParams[key] = filter;

    } else {
      delete updatedParams[key];
    }

    updateFilters(updatedParams);
    setSearchParams(updatedParams);

  };

  const handleResetFilterClick = () => {
    const updatedParams = { ...params };
    delete updatedParams.cat;
    delete updatedParams.type;
    delete updatedParams.lvl;
    isReset = true;
    setFilterPriceValue({from: 0, to: 0});
    setSearchParams(updatedParams);
    updateFilters(updatedParams);
  };

  const handleFilterChangeKeyDown = (event: KeyboardEvent<HTMLInputElement>, filter: Filters, key: KeyFilters) => {
    const updatedParams = { ...params };
    if (event.code === NAME_KEY_ENTER) {
      updatedParams[key] = filter;
      setSearchParams(updatedParams);
      updateFilters(updatedParams);
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

    if(!sortTypeName || sortTypeName === 'null') {
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
                  onChangeFilterPrice={handleChangeFilterPrice}
                  filterPriceValue = {filterPriceValue}
                  initialFilterPrice = {initialPriceValueFilter}
                  onChangeSetFilterPriceValue = {handleChangeSetFilterPriceValue}
                />
                <div className="catalog__content">
                  <CatalogSort sortTypeName={sortTypeName} onSortTypeNameChange={handleSortTypeNameChange} sortTypeBy={sortTypeBy} onSortTypeByChange={handleSortTypeByChange} />
                  {
                    cameras.length > 0 ? <CardsList cameras={currentCameras} onBuyClick={handleBuyClick}/> :
                      <EmptyListProducts />
                  }
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
