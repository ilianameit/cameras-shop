import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const/const';
import { CouponName, Item, Promocode } from '../../types/types';
import { fetchDiscountAction, fetchPromoAction } from '../api-actions';

type PromoStateType = {
  promo: Item[];
  promocode: Promocode;
  isDiscountLoading: boolean;
  invalidCoupon: boolean;
}

const initialState: PromoStateType = {
  promo: [],
  promocode: {
    coupon: null,
    discount: 0,
  },
  isDiscountLoading: false,
  invalidCoupon: false,
};

export const promoSlice = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {
    setCouponName: (state, action: PayloadAction<CouponName | null>) => {
      state.promocode.coupon = action.payload;
    },
    resetPromocode: (state) => {
      state.promocode = {
        coupon: null,
        discount: 0,
      };
      state.invalidCoupon = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
      })
      .addCase(fetchDiscountAction.fulfilled, (state, action) => {
        state.promocode.discount = action.payload;
        state.isDiscountLoading = false;
        state.invalidCoupon = false;
      })
      .addCase(fetchDiscountAction.pending, (state) => {
        state.isDiscountLoading = true;
      })
      .addCase(fetchDiscountAction.rejected, (state) => {
        state.invalidCoupon = true;
        state.isDiscountLoading = false;
        state.promocode.coupon = null;
      });
  },
});


export const { setCouponName, resetPromocode } = promoSlice.actions;
