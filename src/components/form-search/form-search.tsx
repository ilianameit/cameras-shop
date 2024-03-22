import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/camera-slice/selectors';
import { AppRoutes, MIN_COUNT_SEARCH_VALUE, NAME_KEY_DOWN, NAME_KEY_ENTER, NAME_KEY_UP } from '../../const/const';
import classNames from 'classnames';
import { Camera } from '../../types/types';
import { useNavigate } from 'react-router-dom';

function FormSearch(): JSX.Element {
  const cameras = useAppSelector(getCameras);

  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState('');
  const [isSelectListOpen, setIsSelectListOpen] = useState(false);
  const [filterCameras, setFilterCameras] = useState<Camera[]>([]);
  const [selectedItem, setSelectedItem] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const activeItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.focus();
    }
  }, [selectedItem]);

  function handleChangeSearchValue(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target.value;
    setSearchValue(target);
    setIsSelectListOpen(false);
    setFilterCameras([]);

    const value = target.toLowerCase().replaceAll(' ', '');

    if(value.length) {
      setIsSelectListOpen(true);
    }
    if(value.length >= MIN_COUNT_SEARCH_VALUE) {
      let searchCameras;
      const isSearchedNameCameras = cameras
        .filter((camera) =>
          camera.name.toLocaleLowerCase().replaceAll(' ', '')
            .search(value) !== -1
        );
      const isSearchedCategoryCameras = cameras
        .filter((camera) =>
          camera.category.toLocaleLowerCase().replaceAll(' ', '')
            .search(value) !== -1
        );
      const isSearchedTypeCameras = cameras
        .filter((camera) =>
          camera.type.toLocaleLowerCase().replaceAll(' ', '')
            .search(value) !== -1
        );
      const isSearchedLevelCameras = cameras
        .filter((camera) =>
          camera.level.toLocaleLowerCase().replaceAll(' ', '')
            .search(value) !== -1
        );

      if (isSearchedNameCameras.length) {
        searchCameras = isSearchedNameCameras;
      } else if (isSearchedCategoryCameras.length) {
        searchCameras = isSearchedCategoryCameras;
      } else if (isSearchedTypeCameras.length) {
        searchCameras = isSearchedTypeCameras;
      } else {
        searchCameras = isSearchedLevelCameras;
      }

      setFilterCameras(searchCameras);
    }
  }

  function handleButtonCloseClick() {
    setSearchValue('');
    setIsSelectListOpen(false);
    setFilterCameras([]);
    setSelectedItem(-1);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  function handleSelectCameraClick(id: Camera['id']) {
    navigate(`${AppRoutes.Product}${id}`);
  }

  function handleSelectItemFocusClick(event: KeyboardEvent<HTMLElement>, id: Camera['id']) {
    if (event.code === NAME_KEY_ENTER) {
      navigate(`${AppRoutes.Product}${id}`);
    }
  }

  function handleFormSearchKeydown(event: KeyboardEvent<HTMLFormElement>) {
    if (event.key === NAME_KEY_UP) {
      event.preventDefault();
      if (selectedItem === -1) {
        setSelectedItem(0);
      }
      setSelectedItem((prevSelectedItem) =>
        prevSelectedItem === 0 ? 0 : prevSelectedItem - 1
      );
    } else if (event.key === NAME_KEY_DOWN) {
      event.preventDefault();
      setSelectedItem((prevSelectedItem) =>
        prevSelectedItem === filterCameras.length - 1 ? filterCameras.length - 1 : prevSelectedItem + 1
      );
    }
  }

  return(
    <div className={classNames(
      'form-search',
      {'list-opened':  isSelectListOpen}
    )}
    >
      <form
        onKeyDown={handleFormSearchKeydown}
      >
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            onChange={handleChangeSearchValue}
            value={searchValue}
            ref={inputRef}
            aria-label='Поиск по сайту'
          />
        </label>
        {
          filterCameras.length > 0 &&
            <ul className="form-search__select-list">
              {
                filterCameras.map((camera, index) =>
                  (
                    <li
                      key={`${camera.id}-search`}
                      className="form-search__select-item"
                      tabIndex={0}
                      onClick={() => handleSelectCameraClick(camera.id)}
                      onKeyDown={(event) => handleSelectItemFocusClick(event, camera.id)}
                      ref={selectedItem === index ? activeItemRef : null}
                    >
                      {camera.name}
                    </li>
                  )
                )
              }
            </ul>
        }
      </form>
      <button
        className="form-search__reset"
        type="reset"
        onClick={handleButtonCloseClick}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default FormSearch;
