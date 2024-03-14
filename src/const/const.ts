import {Filters, KeyFilters, SortTypeByState, SortTypeState } from '../types/types';

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

type FiltersState = {
  key: KeyFilters;
  header: string;
  filters: {
      name: string;
      label: Filters;
      text?: string;
    }[];
}[];

export const FILTERS: FiltersState = [
  {
    key: 'cat',
    header: 'Категория',
    filters: [
      {
        name: 'photocamera',
        label: 'Фотоаппарат',
        text: 'Фотокамера'
      },
      {
        name: 'videocamera',
        label: 'Видеокамера'
      }
    ]
  },
  {
    key: 'type',
    header: 'Тип камеры',
    filters: [
      {
        name: 'digital',
        label: 'Цифровая'
      },
      {
        name: 'film',
        label: 'Плёночная'
      },
      {
        name: 'snapshot',
        label: 'Моментальная'
      },
      {
        name: 'collection',
        label: 'Коллекционная'
      }
    ]
  },
  {
    key: 'lvl',
    header: 'Уровень',
    filters: [
      {
        name: 'zero',
        label: 'Нулевой'
      },
      {
        name: 'non-professional',
        label: 'Любительский'
      },
      {
        name: 'professional',
        label: 'Профессиональный'
      }
    ]
  }
];
