import { CameraCategory, CameraCategoryParams, CameraLevel, CameraLevelParams, CameraType, CameraTypeParams, Filters, FiltersParams, KeyFilters, SortTypeByState, SortTypeState } from '../types/types';

export enum AppRoutes {
  Root = '/',
  Product = '/product/',
  Basket = '/basket'
}

export enum NameSpace {
  Camera = 'CAMERA',
  Promo = 'PROMO',
  Similar = 'SIMILAR',
  Review = 'REVIEW',
  Coupon = 'COUPON',
  Order = 'ORDER',
  App = 'APP',
}

export enum APIRoute {
  Cameras = '/cameras',
  Similar = '/similar',
  Promo = '/promo',
  Reviews = '/reviews',
  Coupons = '/coupons',
  Orders = '/orders',
}

export enum TabName {
  Feature = 'feature',
  Description = 'description',
}

export const ratingStarsName = {
  1: 'Ужасно',
  2: 'Плохо',
  3: 'Нормально',
  4: 'Хорошо',
  5: 'Отлично'
};

export const sortType: SortTypeState = {
  sortPrice: 'цене',
  sortPopular: 'популярности'
};

export const sortBy: SortTypeByState = {
  up: 'возрастанию',
  down: 'убыванию',
};

export const MIN_COUNT_SEARCH_VALUE = 3;

export const NAME_KEY_ENTER = 'Enter';
export const NAME_KEY_UP = 'ArrowUp';
export const NAME_KEY_DOWN = 'ArrowDown';
export const NAME_KEY_TAB = 'Tab';

export const FILTER_PRICE: {
  header: string;
  filters: {
    name: 'price' | 'priceUp';
    placeholder: 'от' | 'до';
  }[];
} = {
  header: 'Цена, ₽',
  filters: [
    {
      name: 'price',
      placeholder: 'от'
    },
    {
      name: 'priceUp',
      placeholder: 'до'
    }

  ]
};

export const filterCategoryParamsState: {
  [Key in CameraCategoryParams]: {
    name: Key;
    label: CameraCategory;
    text?: string;
  }
} = {
  photocamera: {
    name: 'photocamera',
    label: 'Фотоаппарат',
    text: 'Фотокамера'
  },
  videocamera: {
    name: 'videocamera',
    label: 'Видеокамера'
  }
};

export const filterTypeParamState: {
  [Key in CameraTypeParams]: {
    name: Key;
    label: CameraType;
  }
} = {
  digital: {
    name: 'digital',
    label: 'Цифровая'
  },
  film: {
    name: 'film',
    label: 'Плёночная'
  },
  snapshot: {
    name: 'snapshot',
    label: 'Моментальная'
  },
  collection: {
    name: 'collection',
    label: 'Коллекционная'
  }
};

export const filterLevelParamState: {
  [Key in CameraLevelParams]: {
    name: Key;
    label: CameraLevel;
  }
} = {
  zero: {
    name: 'zero',
    label: 'Нулевой'
  },
  ['non-professional']: {
    name: 'non-professional',
    label: 'Любительский'
  },
  professional: {
    name: 'professional',
    label: 'Профессиональный'
  }
};


type FiltersState = {
  key: KeyFilters;
  header: string;
  filters: {
      name: FiltersParams;
      label: Filters;
      text?: string;
    }[];
}[];

export const FILTERS: FiltersState = [
  {
    key: 'cat',
    header: 'Категория',
    filters: [
      filterCategoryParamsState.photocamera,
      filterCategoryParamsState.videocamera,
    ]
  },
  {
    key: 'type',
    header: 'Тип камеры',
    filters: [
      filterTypeParamState.digital,
      filterTypeParamState.film,
      filterTypeParamState.snapshot,
      filterTypeParamState.collection
    ]
  },
  {
    key: 'lvl',
    header: 'Уровень',
    filters: [
      filterLevelParamState.zero,
      filterLevelParamState['non-professional'],
      filterLevelParamState.professional
    ]
  }
];
