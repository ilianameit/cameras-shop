import { ChangeEvent, KeyboardEvent } from 'react';
import { FILTERS, FILTER_PRICE } from '../../const/const';
import { CameraCategory, CameraLevel, CameraType, Filters, KeyFilters } from '../../types/types';

type CatalogFilterProps = {
  onFilterChange: (evt: ChangeEvent<HTMLInputElement>, filter: Filters, key: KeyFilters) => void;
  onFilterChangeKeyDown: (event: KeyboardEvent<HTMLInputElement>, filter: Filters, key: KeyFilters) => void;
  onResetFilterClick: () => void;
  filterCategory: CameraCategory | '';
  filterType: CameraType | '';
  filterLevel: CameraLevel | '';
}

function CatalogFilter({onFilterChange, onResetFilterClick, filterCategory, filterType, filterLevel, onFilterChangeKeyDown}: CatalogFilterProps): JSX.Element {
  return(
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>

          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">{FILTER_PRICE.header}</legend>
            <div className="catalog-filter__price-range">
              {
                FILTER_PRICE.filters.map((filter) => (
                  <div key={`${filter.name}-filter`} className="custom-input">
                    <label>
                      <input
                        type="number"
                        name={filter.name}
                        placeholder={filter.placeholder}
                      />
                    </label>
                  </div>
                ))
              }
            </div>
          </fieldset>

          {
            FILTERS.map(({key, header, filters}) => (
              <fieldset key={key} className="catalog-filter__block">
                <legend className="title title--h5">{header}</legend>
                {
                  filters.map(({name, label, text}) => (
                    <div key={`${name}-filter`} className="custom-checkbox catalog-filter__item">
                      <label>
                        <input
                          type="checkbox"
                          name={name}
                          onChange={(evt) => onFilterChange(evt, label, key)}
                          onKeyDown={(evt) => onFilterChangeKeyDown(evt, label, key)}
                          checked = {
                            label === filterCategory || label === filterType || label === filterLevel
                          }
                          disabled = {
                            label === 'Плёночная' && filterCategory === 'Видеокамера' ||
                            label === 'Моментальная' && filterCategory === 'Видеокамера'
                          }
                        />
                        <span className="custom-checkbox__icon"></span>
                        <span className="custom-checkbox__label">
                          {
                            text ? text : label
                          }
                        </span>
                      </label>
                    </div>
                  ))
                }
              </fieldset>
            ))
          }
          <button
            className="btn catalog-filter__reset-btn"
            type="reset"
            onClick={onResetFilterClick}
            disabled={
              !filterCategory && !filterType && !filterLevel
            }
          >
            Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export default CatalogFilter;
