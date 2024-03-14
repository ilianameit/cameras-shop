import { ChangeEvent } from 'react';
import { sortBy, sortType } from '../../const/const';
import { SortTypeBy, SortTypeName } from '../../types/types';

type CatalogSortProps = {
  sortTypeName: SortTypeName | '' | 'null';
  onSortTypeNameChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  sortTypeBy: SortTypeBy | '' | 'null';
  onSortTypeByChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}

function CatalogSort({sortTypeName, onSortTypeNameChange, sortTypeBy, onSortTypeByChange}: CatalogSortProps): JSX.Element {
  return(
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            {
              Object.entries(sortType)
                .map(([type, value]) => (
                  <div key={type} className="catalog-sort__btn-text">
                    <input
                      type="radio"
                      id={type}
                      name="sort"
                      checked={sortTypeName === type}
                      onChange={onSortTypeNameChange}
                    />
                    <label htmlFor={type}>по {value}</label>
                  </div>
                ))
            }
          </div>
          <div className="catalog-sort__order">
            {
              Object.entries(sortBy)
                .map(([type, value]) => (
                  <div key={type} className={`catalog-sort__btn catalog-sort__btn--${type}`}>
                    <input
                      type="radio"
                      id={type}
                      name="sort-icon"
                      aria-label={value}
                      checked={sortTypeBy === type}
                      onChange={onSortTypeByChange}
                    />
                    <label htmlFor={type}>
                      <svg width={16} height={14} aria-hidden="true">
                        <use xlinkHref="#icon-sort"></use>
                      </svg>
                    </label>
                  </div>
                ))
            }
          </div>
        </div>
      </form>
    </div>
  );
}

export default CatalogSort;
