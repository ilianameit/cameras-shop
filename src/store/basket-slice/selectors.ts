import { NameSpace } from '../../const/const';
import { State } from '../../types/state';

export const getPromocode = (state: State) => state[NameSpace.Basket].promocode;
export const getStatusLoadingDiscount = (state: State) => state[NameSpace.Basket].isDiscountLoading;
export const getInvalidCouponStatus = (state: State) => state[NameSpace.Basket].invalidCoupon;
export const getCamerasFromCart = (state: State) => state[NameSpace.Basket].cart;
export const getAddToCartSuccessStatus = (state: State) => state[NameSpace.Basket].isSuccessAddToCart;

export const getCreateOrderSuccessStatus = (state: State) => state[NameSpace.Basket].isCreateOrderSuccess;
export const getCreateOrderFailStatus = (state: State) => state[NameSpace.Basket].isCreateOrderFail;
