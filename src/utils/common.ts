import dayjs from 'dayjs';
import { CameraBasket, Promocode, Review } from '../types/types';
import { NAME_KEY_CAMERAS_STORAGE, NAME_KEY_PROMOCODE_STORAGE } from '../const/const';

export function returnFormatedPrice(price: number) {
  return `${price.toLocaleString('ru-RU')} ₽`;
}

export function sortByDate(reviewA: Review, reviewB: Review) {
  return dayjs(reviewB.createAt).valueOf() - dayjs(reviewA.createAt).valueOf();
}

export function getCamerasFromLocalStorage(products: CameraBasket[]) {
  localStorage.setItem(NAME_KEY_CAMERAS_STORAGE, JSON.stringify(products));
}
export function getPromocodeFromLocalStorage(promocode: Promocode) {
  localStorage.setItem(NAME_KEY_PROMOCODE_STORAGE, JSON.stringify(promocode));
}
