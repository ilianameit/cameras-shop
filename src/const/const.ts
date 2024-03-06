import {SortTypeByState, SortTypeState } from '../types/types';

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
