import { ThunkDispatch } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { State } from '../types/state';
import { Camera, CameraBasket, Item, Review } from '../types/types';
import { createAPI } from '../services/api';

export const mockCamera: Camera = {
  id: 1,
  name: 'Ретрокамера Dus Auge lV',
  vendorCode: 'DA4IU67AD5',
  type: 'Коллекционная',
  category: 'Видеокамера',
  description: 'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди оллекционеров и яростных почитателей старинной техники.',
  level: 'Нулевой',
  price: 65000,
  rating: 5,
  reviewCount: 16,
  previewImg: 'img/content/das-auge.jpg',
  previewImg2x: 'img/content/das-auge@2x.jpg',
  previewImgWebp: 'img/content/das-auge.webp',
  previewImgWebp2x: 'img/content/das-auge@2x.webp'
};

export const mockCameras: Camera[] = [
  {
    'id': 1,
    'name': 'Ретрокамера Dus Auge lV',
    'vendorCode': 'DA4IU67AD5',
    'type': 'Коллекционная',
    'category': 'Видеокамера',
    'description': 'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники. Вы тоже можете прикоснуться к волшебству аналоговой съёмки, заказав этот чудо-аппарат. Кто знает, может с Das Auge IV начнётся ваш путь к наградам всех престижных кинофестивалей.',
    'previewImg': 'img/content/das-auge.jpg',
    'level': 'Любительский',
    'price': 73450,
    'previewImg2x': 'img/content/das-auge@2x.jpg',
    'previewImgWebp': 'img/content/das-auge.webp',
    'previewImgWebp2x': 'img/content/das-auge@2x.webp',
    'rating': 4,
    'reviewCount': 165
  },
  {
    'id': 2,
    'name': 'FastShot MR-5',
    'vendorCode': 'JH34KHN895',
    'type': 'Моментальная',
    'category': 'Фотоаппарат',
    'description': 'Новое слово в создании моментальных фото. Высокое качество снимков, легко перезаряжаемые кассеты, встроенная вспышка. Создавайте альбомы здесь и сейчас.',
    'previewImg': 'img/content/fast-shot.jpg',
    'level': 'Любительский',
    'price': 18970,
    'previewImg2x': 'img/content/fast-shot@2x.jpg',
    'previewImgWebp': 'img/content/fast-shot.webp',
    'previewImgWebp2x': 'img/content/fast-shot@2x.webp',
    'rating': 4,
    'reviewCount': 153
  },
  {
    'id': 3,
    'name': 'Instaprinter P2',
    'vendorCode': 'KLU789GH56',
    'type': 'Цифровая',
    'category': 'Фотоаппарат',
    'description': 'Компактная модель позволяющая получать чёткие снимки с 25-кратным зумом. В комплекте зарядное устройство и бархатный чехол, а так же удобный шнурок на шею.',
    'previewImg': 'img/content/instaprinter.jpg',
    'level': 'Нулевой',
    'price': 8430,
    'previewImg2x': 'img/content/instaprinter@2x.jpg',
    'previewImgWebp': 'img/content/instaprinter.webp',
    'previewImgWebp2x': 'img/content/instaprinter@2x.webp',
    'rating': 3,
    'reviewCount': 95
  }
];

export const mockReview: Review = {
  'id': '5b9497d9-3616-48f5-b36c-33800bc07abd',
  'userName': 'Дарья',
  'advantage': 'Хорошо. Отличная камера.',
  'disadvantage': 'Без объектива',
  'review': 'В целом для домашнего использования в самый раз!',
  'rating': 3,
  'createAt': '2023-10-31T09:38:11.174Z',
  'cameraId': 1
};

export const mockPromo: Item[] = [
  {
    'id': 7,
    'name': 'Look 54',
    'previewImg': 'img/content/promo-look-54.jpg',
    'previewImg2x': 'img/content/promo-look-54@2x.jpg',
    'previewImgWebp': 'img/content/promo-look-54.webp',
    'previewImgWebp2x': 'img/content/promo-look-54@2x.webp'
  },
  {
    'id': 35,
    'name': 'Click Pro',
    'previewImg': 'img/content/promo_click_pro.jpg',
    'previewImg2x': 'img/content/promo_click_pro@2x.jpg',
    'previewImgWebp': 'img/content/promo_click_pro.webp',
    'previewImgWebp2x': 'img/content/promo_click_pro@2x.webp'
  },
  {
    'id': 36,
    'name': 'Click Lite R',
    'previewImg': 'img/content/promo_click-lite-r.jpg',
    'previewImg2x': 'img/content/promo_click-lite-r@2x.jpg',
    'previewImgWebp': 'img/content/promo_click-lite-r.webp',
    'previewImgWebp2x': 'img/content/promo_click-lite-r@2x.webp'
  }
];

export const mockCamerasBasket: CameraBasket[] = [
  {
    'id': 1,
    count: 1,
    'name': 'Ретрокамера Dus Auge lV',
    'vendorCode': 'DA4IU67AD5',
    'type': 'Коллекционная',
    'category': 'Видеокамера',
    'description': 'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники. Вы тоже можете прикоснуться к волшебству аналоговой съёмки, заказав этот чудо-аппарат. Кто знает, может с Das Auge IV начнётся ваш путь к наградам всех престижных кинофестивалей.',
    'previewImg': 'img/content/das-auge.jpg',
    'level': 'Любительский',
    'price': 73450,
    'previewImg2x': 'img/content/das-auge@2x.jpg',
    'previewImgWebp': 'img/content/das-auge.webp',
    'previewImgWebp2x': 'img/content/das-auge@2x.webp',
    'rating': 4,
    'reviewCount': 165
  },
  {
    'id': 2,
    count: 2,
    'name': 'FastShot MR-5',
    'vendorCode': 'JH34KHN895',
    'type': 'Моментальная',
    'category': 'Фотоаппарат',
    'description': 'Новое слово в создании моментальных фото. Высокое качество снимков, легко перезаряжаемые кассеты, встроенная вспышка. Создавайте альбомы здесь и сейчас.',
    'previewImg': 'img/content/fast-shot.jpg',
    'level': 'Любительский',
    'price': 18970,
    'previewImg2x': 'img/content/fast-shot@2x.jpg',
    'previewImgWebp': 'img/content/fast-shot.webp',
    'previewImgWebp2x': 'img/content/fast-shot@2x.webp',
    'rating': 4,
    'reviewCount': 153
  },
  {
    'id': 3,
    count: 1,
    'name': 'Instaprinter P2',
    'vendorCode': 'KLU789GH56',
    'type': 'Цифровая',
    'category': 'Фотоаппарат',
    'description': 'Компактная модель позволяющая получать чёткие снимки с 25-кратным зумом. В комплекте зарядное устройство и бархатный чехол, а так же удобный шнурок на шею.',
    'previewImg': 'img/content/instaprinter.jpg',
    'level': 'Нулевой',
    'price': 8430,
    'previewImg2x': 'img/content/instaprinter@2x.jpg',
    'previewImgWebp': 'img/content/instaprinter.webp',
    'previewImgWebp2x': 'img/content/instaprinter@2x.webp',
    'rating': 3,
    'reviewCount': 95
  }
];

export const MockStore = (initialState?: Partial<State>): State => ({
  CAMERA: {
    cameras: [],
    loadingCameras: false,
    oneCamera: mockCamera,
    loadingOneCamera: false,
    similarCameras: [],
    camerasFilteredByPrice: [],
    camerasFilteredByPriceLoading: false,
  },
  REVIEW: {
    reviews: [],
    isLoadingReview: false,
    isAddReviewSuccess: false
  },
  PROMO: {
    promo: [],
  },
  BASKET: {
    promocode: {
      coupon: null,
      discount: 0
    },
    isDiscountLoading: false,
    invalidCoupon: false,
    cart: [],
    isSuccessAddToCart: false,
    isCreateOrderSuccess: false,
    isCreateOrderFail: false
  },
  ...initialState ?? {},
});

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;
