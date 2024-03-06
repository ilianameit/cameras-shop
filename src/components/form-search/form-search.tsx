import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/camera-slice/selectors';
import { AppRoutes, MIN_COUNT_SEARCH_VALUE } from '../../const/const';
import classNames from 'classnames';
import { Camera } from '../../types/types';
import { useNavigate } from 'react-router-dom';

function FormSearch(): JSX.Element {
  const cameras = useAppSelector(getCameras);

  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState('');
  const [isSelectListOpen, setIsSelectListOpen] = useState(false);
  const [filterCameras, setFilterCameras] = useState<Camera[]>([]);

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
      const searchCameras = cameras.filter((camera) =>
        camera.name.toLocaleLowerCase().replaceAll(' ', '')
          .search(value) !== -1
      );
      setFilterCameras(searchCameras);
    }
  }

  function handleButtonCloseClick() {
    setSearchValue('');
    setIsSelectListOpen(false);
    setFilterCameras([]);
  }

  function handleSelectCameraClick(id: Camera['id']) {
    navigate(`${AppRoutes.Product}${id}`);
  }

  function handleSelectItemFocusClick(event: KeyboardEvent<HTMLElement>, id: Camera['id']) {
    if (event.code === 'Enter') {
      navigate(`${AppRoutes.Product}${id}`);
    }
  }

  return(
    <div className={classNames(
      'form-search',
      {'list-opened':  isSelectListOpen}
    )}
    >
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту" onChange={handleChangeSearchValue} value={searchValue}/>
        </label>
        {
          filterCameras.length > 0 &&
            <ul className="form-search__select-list">
              {
                filterCameras.map((camera) =>
                  (
                    <li
                      key={`${camera.id}-search`}
                      className="form-search__select-item"
                      tabIndex={0}
                      onClick={() => handleSelectCameraClick(camera.id)}
                      onKeyDown={(event) => handleSelectItemFocusClick(event, camera.id)}
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
