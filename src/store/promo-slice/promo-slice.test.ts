import { CouponName } from '../../types/types';
import { mockPromo } from '../../utils/mocks';
import { fetchDiscountAction, fetchPromoAction } from '../api-actions';
import { promoSlice } from './promo-slice';

describe('PromoSlice', () => {
  describe('checkSliceDefault', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        promocode: {
          coupon: null,
          discount: 0,
        },
        promo: [],
        invalidCoupon: false,
        isDiscountLoading: false,
      };

      const result = promoSlice.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action and undefined', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        promocode: {
          coupon: null,
          discount: 0,
        },
        promo: [],
        invalidCoupon: false,
        isDiscountLoading: false,
      };

      const result = promoSlice.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchPromoAction', () => {

    it('should return promo array with fetchPromoAction.fulfilled action', () => {
      const expectedState = {
        promocode: {
          coupon: null,
          discount: 0,
        },
        promo: [...mockPromo],
        invalidCoupon: false,
        isDiscountLoading: false,
      };

      const result = promoSlice.reducer(
        undefined,
        fetchPromoAction.fulfilled(
          mockPromo, '', undefined)
      );

      expect(result).toEqual(expectedState);
    });

  });

  describe('fetchDiscountAction', () => {

    it('should return promo discont with fetchDiscountAction.fulfilled action', () => {
      const coupon: CouponName = 'camera-333';
      const discont = 15;

      const expectedState = {
        promocode: {
          coupon: null,
          discount: 15,
        },
        promo: [],
        invalidCoupon: false,
        isDiscountLoading: false,
      };

      const result = promoSlice.reducer(
        undefined,
        fetchDiscountAction.fulfilled(
          discont, '', coupon)
      );

      expect(result).toEqual(expectedState);
    });

    it('should return invalidCoupon with fetchDiscountAction.rejected action', () => {
      const coupon: CouponName = 'camera-333';

      const expectedState = {
        promocode: {
          coupon: null,
          discount: 0,
        },
        promo: [],
        invalidCoupon: true,
        isDiscountLoading: false,
      };

      const result = promoSlice.reducer(
        undefined,
        fetchDiscountAction.rejected(
          null, '', coupon)
      );

      expect(result).toEqual(expectedState);
    });

    it('should return isDiscountLoading with fetchDiscountAction.pending action', () => {
      const coupon: CouponName = 'camera-333';
      const expectedState = {
        promocode: {
          coupon: null,
          discount: 0,
        },
        promo: [],
        invalidCoupon: false,
        isDiscountLoading: true,
      };

      const result = promoSlice.reducer(
        undefined,
        fetchDiscountAction.pending(
          '', null, coupon)
      );

      expect(result).toEqual(expectedState);

    });

  });
});
