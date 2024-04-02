import dayjs from 'dayjs';
import { Review } from '../types/types';

export function returnFormatedPrice(price: number) {
  return `${price.toLocaleString('ru-RU')} ₽`;
}

export function sortByDate(reviewA: Review, reviewB: Review) {
  return dayjs(reviewB.createAt).valueOf() - dayjs(reviewA.createAt).valueOf();
}
