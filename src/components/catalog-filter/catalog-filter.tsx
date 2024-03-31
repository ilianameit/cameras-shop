import { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';
import { FILTERS, FILTER_PRICE, filterCategoryParamsState, filterTypeParamState } from '../../const/const';
import { KeyFilters, InitialPriceType, PriceFilterType, FiltersParams, CameraCategoryParams, CameraTypeParams, CameraLevelParams } from '../../types/types';

type CatalogFilterProps = {
  onFilterChange: (evt: ChangeEvent<HTMLInputElement>, filter: FiltersParams, key: KeyFilters) => void;
  onFilterChangeKeyDown: (event: KeyboardEvent<HTMLInputElement>, filter: FiltersParams, key: KeyFilters) => void;
  onResetFilterClick: () => void;
  filterCategory: CameraCategoryParams | undefined;
  filterType: CameraTypeParams | undefined;
  filterLevel: CameraLevelParams | undefined;
  filterPriceValue: InitialPriceType;
  onChangeFilterPrice: (event: FocusEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>, key: PriceFilterType) => void;
  initialFilterPrice: InitialPriceType;
  onChangeSetFilterPriceValue: (event: ChangeEvent<HTMLInputElement>, key: PriceFilterType) => void;
}

function CatalogFilter({onFilterChange, onResetFilterClick, filterCategory, filterType, filterLevel, onFilterChangeKeyDown, initialFilterPrice, filterPriceValue, onChangeFilterPrice, onChangeSetFilterPriceValue}: CatalogFilterProps): JSX.Element {

  const isNameChecked = (stringToSplit : FiltersParams | undefined, name : FiltersParams) => {
    const arrayOfStrings = stringToSplit ? stringToSplit.split(',') : [];
    return arrayOfStrings.includes(name);
  };

  return(
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>

          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">{FILTER_PRICE.header}</legend>
            <div className="catalog-filter__price-range">
              {
                FILTER_PRICE.filters.map((filter) => {
                  const pricePlaceholder = filter.name === 'price' ? initialFilterPrice.from : initialFilterPrice.to;
                  const key: PriceFilterType = filter.name === 'price' ? 'from' : 'to';
                  const priceValue = filter.name === 'price' ? filterPriceValue.from : filterPriceValue.to;

                  return (
                    <div key={`${filter.name}-filter`} className="custom-input">
                      <label>
                        <input
                          type="number"
                          name={filter.name}
                          placeholder={String(pricePlaceholder)}
                          onBlur={(evt) => onChangeFilterPrice(evt, key)}
                          onChange={(evt) => onChangeSetFilterPriceValue(evt, key)}
                          value={priceValue > 0 ? priceValue : ''}
                          onKeyDown={(evt) => onChangeFilterPrice(evt, key)}
                        />
                      </label>
                    </div>
                  );
                })
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
                          onChange={(evt) => onFilterChange(evt, name, key)}
                          onKeyDown={(evt) => onFilterChangeKeyDown(evt, name, key)}
                          checked = {
                            name === filterCategory || isNameChecked(filterType, name) || isNameChecked(filterLevel, name)
                          }
                          disabled = {
                            name === filterTypeParamState.film.name && filterCategory === filterCategoryParamsState.videocamera.name ||
                            name === filterTypeParamState.snapshot.name && filterCategory === filterCategoryParamsState.videocamera.name
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
              !filterCategory && !filterType && !filterLevel && !filterPriceValue.from && !filterPriceValue.to
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
