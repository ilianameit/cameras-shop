import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import CardsList from '../../components/cards-list/cards-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCameras, getFilteredCameras, getFilteredCamerasRangePrice, getPriceFilteredCameras, getSortedCameras, getStatusLoadingPriceFiltered } from '../../store/camera-slice/selectors';
import Banner from '../../components/banner/banner';
import Pagination from '../../components/pagination/pagination';
import { useSearchParams } from 'react-router-dom';
import { ChangeEvent, FocusEvent, KeyboardEvent, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AddItemPopup from '../../components/popup/add-item-popup/add-item-popup';
import { NAME_KEY_ENTER, breadcrumbCatalog, breadcrumbNames } from '../../const/const';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { Breadcrumb, Camera, SortTypeBy, SortTypeName, KeyFilters, InitialPriceType, PriceFilterType, FiltersParams, CameraCategoryParams, CameraTypeParams, CameraLevelParams } from '../../types/types';
import ModalWindow from '../../components/modal-window/modal-window';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import { fetchCamerasPriceAction } from '../../store/api-actions';
import EmptyListProducts from '../../components/empty-list-products/empty-list-products';

const MAX_COUNT_ITEM_PAGE = 9;

type Params = {
  page: string;
  sort?: SortTypeName | undefined;
  dir?: SortTypeBy | undefined;
  cat?: string | undefined ;
  type?: string | undefined;
  lvl?: string | undefined;
}

function CatalogScreenComponent(): JSX.Element {
  const dispatch = useAppDispatch();
  const totalCameras = useAppSelector(getCameras);
  const isLoadingPriceFiltered = useAppSelector(getStatusLoadingPriceFiltered);
  const totalCamerasFilteredByPriceRange = useAppSelector(getPriceFilteredCameras);

  const priceForTotalCamerasInitional = {
    from: 0,
    to: Infinity
  };
  const [priceForTotalCameras, ] = useState<InitialPriceType>(priceForTotalCamerasInitional);
  useEffect(() => {
    dispatch(fetchCamerasPriceAction(priceForTotalCameras));
  }, [dispatch, priceForTotalCameras]);

  const [searchParams, setSearchParams] = useSearchParams();

  const focusItemAddPopup = useRef<HTMLButtonElement | null>(null);

  const filterCategory: CameraCategoryParams | undefined = searchParams.get('cat') as CameraCategoryParams | undefined;
  const filterType: CameraTypeParams | undefined = searchParams.get('type') as CameraTypeParams | undefined;
  const filterLevel: CameraLevelParams | undefined = searchParams.get('lvl') as CameraLevelParams | undefined;

  const sortTypeName: SortTypeName | undefined = searchParams.get('sort') as SortTypeName | undefined ;
  const sortTypeBy: SortTypeBy | undefined = searchParams.get('dir') as SortTypeBy | undefined;

  const currentPage = useMemo(() => Number(searchParams.get('page') || 1), [searchParams]);
  const beginItem = useMemo(() => (currentPage - 1) * MAX_COUNT_ITEM_PAGE, [currentPage]);
  const endItem = useMemo(() => currentPage * MAX_COUNT_ITEM_PAGE, [currentPage]);

  const [camerasByPrice, setCamerasByPrice] = useState<Camera[]>(totalCameras);

  useEffect(() => {
    if(!isLoadingPriceFiltered) {
      setCamerasByPrice(totalCamerasFilteredByPriceRange);
    }
  }, [isLoadingPriceFiltered, totalCamerasFilteredByPriceRange]);

  const filteredCameras = getFilteredCameras(camerasByPrice, filterCategory, filterType, filterLevel);

  const sortedPriceCameras = getSortedCameras(filteredCameras, 'sortPrice', 'up');

  const initialPrice = {
    from: sortedPriceCameras.length ? sortedPriceCameras[0].price : 0,
    to: sortedPriceCameras.length ? sortedPriceCameras[sortedPriceCameras.length - 1].price : 0,
  };

  const [filterPrice, setFilterPrice] = useState<InitialPriceType>(initialPrice);

  const changeFilterPriceCameras = (newPriceRange: InitialPriceType) => {
    setCamerasByPrice(getFilteredCamerasRangePrice(totalCamerasFilteredByPriceRange, newPriceRange));
  };

  const cameras = getSortedCameras(filteredCameras, sortTypeName, sortTypeBy);

  function getParams() {
    const params: Params = {
      page: '1',
      sort: sortTypeName,
      dir: sortTypeBy,
      cat: filterCategory,
      type: filterType,
      lvl: filterLevel,
    };

    Object.entries(params).forEach(([key, value]) => {
      if (!value) {
        delete params[key as keyof Params];
      }
    });

    return params;
  }

  const params: Params = getParams();

  const [filterPriceValue, setFilterPriceValue] = useState<InitialPriceType>({from: 0, to: 0});
  const [initialPriceValueFilter, setInitialPriceValueFilter] = useState<InitialPriceType>(initialPrice);

  function handleChangeFilterPrice(event: FocusEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>, key: PriceFilterType) {
    if((event as KeyboardEvent).key === NAME_KEY_ENTER || event.type === 'focusout') {

      const value = Number((event.target as HTMLInputElement).value);
      if(value > 0 && (event.target as HTMLInputElement).value) {

        setFilterPrice({...filterPrice, [key]: initialPriceValueFilter[key]});
        changeFilterPriceCameras({...filterPrice, [key]: initialPriceValueFilter[key]});

        if(key === 'from' && value < initialPriceValueFilter.from) {

          setFilterPriceValue({...filterPriceValue, from: initialPriceValueFilter.from});

        } else if(key === 'from' && (value > initialPriceValueFilter.to || (value > filterPriceValue.to && filterPriceValue.to > 0))) {

          setFilterPriceValue({ ...filterPriceValue, [key]: 0 });

        } else if(key === 'to' && value > initialPriceValueFilter.to) {

          setFilterPriceValue({...filterPriceValue, to: initialPriceValueFilter.to});
        } else if(key === 'to' && (value < initialPriceValueFilter.from || (value < filterPriceValue.from && filterPriceValue.from > 0))) {

          setFilterPriceValue({ ...filterPriceValue, [key]: 0 });

        } else{

          setFilterPriceValue({ ...filterPriceValue, [key]: value });
          setFilterPrice({ ...filterPrice, [key]: value });
          changeFilterPriceCameras({ ...filterPrice, [key]: value });

        }
      }
      if(value === 0 && !(event.target as HTMLInputElement).value) {
        setFilterPrice({...filterPrice, [key]: initialPriceValueFilter[key]});
        changeFilterPriceCameras({...filterPrice, [key]: initialPriceValueFilter[key]});
      }
    }
  }

  function handleChangeSetFilterPriceValue(event: ChangeEvent<HTMLInputElement>, key: PriceFilterType) {
    setFilterPriceValue({...filterPriceValue, [key]: Number(event.target.value)});
  }

  const updateFilters = (updatedParams: Params) => {

    if(!isLoadingPriceFiltered){

      const newFilteredCameras = getFilteredCameras(totalCamerasFilteredByPriceRange, updatedParams.cat, updatedParams.type, updatedParams.lvl);
      const newSortedPriceCameras = getSortedCameras(newFilteredCameras, 'sortPrice', 'up');

      const newFilterPrice = {
        from: newSortedPriceCameras.length ? newSortedPriceCameras[0].price : 0,
        to: newSortedPriceCameras.length ? newSortedPriceCameras[newSortedPriceCameras.length - 1].price : 0,
      };

      setFilterPriceValue({from: 0, to: 0});
      setFilterPrice(newFilterPrice);
      changeFilterPriceCameras(newFilterPrice);
      setInitialPriceValueFilter(newFilterPrice);
    }
  };

  const handleFilterChange = (evt: ChangeEvent<HTMLInputElement>, filter: FiltersParams, key: KeyFilters) => {
    const target = evt.target;
    const updatedParams = { ...params };

    if(target.checked) {
      if(key === 'cat'){
        delete updatedParams['type'];
        updatedParams[key] = filter;
      } else {
        if (!Object.prototype.hasOwnProperty.call(updatedParams, key)) {
          updatedParams[key] = filter;
        } else {
          const existingValues = updatedParams[key];
          updatedParams[key] = existingValues ? `${existingValues},${filter}` : existingValues;
        }
      }

    } else {
      if(key === 'cat') {
        delete updatedParams[key];
      } else {
        if (Object.prototype.hasOwnProperty.call(updatedParams, key)) {

          const existingValues = updatedParams[key]?.split(',') || [];

          const index = existingValues.indexOf(filter);
          if (index !== -1) {
            existingValues.splice(index, 1);
            if (existingValues.length === 0) {
              delete updatedParams[key];
            } else {
              updatedParams[key] = existingValues.join(',');
            }
          }

        }
      }
    }

    updateFilters(updatedParams);
    setSearchParams(updatedParams);

  };

  const handleResetFilterClick = () => {
    const updatedParams = { ...params };
    delete updatedParams.cat;
    delete updatedParams.type;
    delete updatedParams.lvl;
    setSearchParams(updatedParams);
    updateFilters(updatedParams);
  };

  const handleFilterChangeKeyDown = (event: KeyboardEvent<HTMLInputElement>, filter: FiltersParams, key: KeyFilters) => {
    const updatedParams = { ...params };
    if (event.code === NAME_KEY_ENTER) {
      updatedParams[key] = filter;
      setSearchParams(updatedParams);
      updateFilters(updatedParams);
    }
  };

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

  const breadcrumbsScreen: Breadcrumb[] = [breadcrumbNames.main, {title: breadcrumbCatalog.title}];

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
              firstFocusElement={focusItemAddPopup}
            >
              <AddItemPopup camera={cameraCard} focusElement={focusItemAddPopup} onClose={handleCloseBuyItemClick} isCardItem={false}/>
            </ModalWindow>)
        }
      </main>
      <Footer />
    </div>
  );
}

const CatalogScreen = memo(CatalogScreenComponent);
export default CatalogScreen;
