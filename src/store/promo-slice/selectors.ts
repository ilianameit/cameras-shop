import { NameSpace } from '../../const/const';
import { State } from '../../types/state';

export const getPromo = (state: State) => state[NameSpace.Promo].promo;
export const getPromocode = (state: State) => state[NameSpace.Promo].promocode;
export const getStatusLoadingDiscount = (state: State) => state[NameSpace.Promo].isDiscountLoading;
export const getInvalidCouponStatus = (state: State) => state[NameSpace.Promo].invalidCoupon;
