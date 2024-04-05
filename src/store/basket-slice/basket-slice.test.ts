import { ChangeProductCount } from '../../const/const';
import { ChangeCount, CouponName } from '../../types/types';
import { mockCamera, mockCamerasBasket } from '../../utils/mocks';
import { fetchDiscountAction , fetchSendOrder } from '../api-actions';
import { addToCart, basketSlice, changeCountCameraInBasket, changeStatusAddToCart, closeErrorModal, deleteFromCart, resetCart } from './basket-slice';

describe('BasketSlice', () => {
  describe('checkSliceDefault', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        cart: [],
        isSuccessAddToCart: false,
        isCreateOrderSuccess: false,
        isCreateOrderFail: false,
        promocode: {
          coupon: null,
          discount: 0,
        },
        isDiscountLoading: false,
        invalidCoupon: false,
      };

      const result = basketSlice.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action and undefined', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        cart: [],
        isSuccessAddToCart: false,
        isCreateOrderSuccess: false,
        isCreateOrderFail: false,
        promocode: {
          coupon: null,
          discount: 0,
        },
        isDiscountLoading: false,
        invalidCoupon: false,
      };

      const result = basketSlice.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchDiscountAction', () => {

    it('should return promo discont with fetchDiscountAction.fulfilled action', () => {
      const coupon: CouponName = 'camera-333';
      const discont = 15;

      const expectedState = {
        cart: [],
        isSuccessAddToCart: false,
        isCreateOrderSuccess: false,
        isCreateOrderFail: false,
        promocode: {
          coupon: null,
          discount: 15,
        },
        invalidCoupon: false,
        isDiscountLoading: false,
      };

      const result = basketSlice.reducer(
        undefined,
        fetchDiscountAction.fulfilled(
          discont, '', coupon)
      );

      expect(result).toEqual(expectedState);
    });

    it('should return invalidCoupon with fetchDiscountAction.rejected action', () => {
      const coupon: CouponName = 'camera-333';

      const expectedState = {
        cart: [],
        isSuccessAddToCart: false,
        isCreateOrderSuccess: false,
        isCreateOrderFail: false,
        promocode: {
          coupon: null,
          discount: 0,
        },
        invalidCoupon: true,
        isDiscountLoading: false,
      };

      const result = basketSlice.reducer(
        undefined,
        fetchDiscountAction.rejected(
          null, '', coupon)
      );

      expect(result).toEqual(expectedState);
    });

    it('should return isDiscountLoading with fetchDiscountAction.pending action', () => {
      const coupon: CouponName = 'camera-333';
      const expectedState = {
        cart: [],
        isSuccessAddToCart: false,
        isCreateOrderSuccess: false,
        isCreateOrderFail: false,
        promocode: {
          coupon: null,
          discount: 0,
        },
        invalidCoupon: false,
        isDiscountLoading: true,
      };

      const result = basketSlice.reducer(
        undefined,
        fetchDiscountAction.pending(
          '', null, coupon)
      );

      expect(result).toEqual(expectedState);

    });

    describe('changeStatusAddToCart', () => {
      it('should changeStatusAddToCart with changeStatusAddToCart action', () => {
        const initialState = {
          cart: [],
          isSuccessAddToCart: false,
          isCreateOrderSuccess: false,
          isCreateOrderFail: false,
          promocode: {
            coupon: null,
            discount: 0,
          },
          invalidCoupon: false,
          isDiscountLoading: false,
        };

        const expectedState = {
          cart: [],
          isSuccessAddToCart: true,
          isCreateOrderSuccess: false,
          isCreateOrderFail: false,
          promocode: {
            coupon: null,
            discount: 0,
          },
          invalidCoupon: false,
          isDiscountLoading: false,
        };

        const result = basketSlice.reducer(initialState, changeStatusAddToCart());

        expect(result).toEqual(expectedState);
      });
    });
    describe('addToCart', () => {
      it('should addToCart with addToCart action', () => {
        const initialState = {
          cart: [{...mockCamera, count:1}],
          isSuccessAddToCart: false,
          isCreateOrderSuccess: false,
          isCreateOrderFail: false,
          promocode: {
            coupon: null,
            discount: 0,
          },
          invalidCoupon: false,
          isDiscountLoading: false,
        };

        const expectedState = {
          cart: [{...mockCamera, count:2}],
          isSuccessAddToCart: true,
          isCreateOrderSuccess: false,
          isCreateOrderFail: false,
          promocode: {
            coupon: null,
            discount: 0,
          },
          invalidCoupon: false,
          isDiscountLoading: false,
        };

        const result = basketSlice.reducer(initialState, addToCart(mockCamera));

        expect(result).toEqual(expectedState);
      });
    });
    describe('deleteFromCart', () => {
      it('should deleteFromCart with deleteFromCart action', () => {
        const initialState = {
          cart: [{...mockCamera, count:1}],
          isSuccessAddToCart: false,
          isCreateOrderSuccess: false,
          isCreateOrderFail: false,
          promocode: {
            coupon: null,
            discount: 0,
          },
          invalidCoupon: false,
          isDiscountLoading: false,
        };

        const expectedState = {
          cart: [],
          isSuccessAddToCart: false,
          isCreateOrderSuccess: false,
          isCreateOrderFail: false,
          promocode: {
            coupon: null,
            discount: 0,
          },
          invalidCoupon: false,
          isDiscountLoading: false,
        };

        const result = basketSlice.reducer(initialState, deleteFromCart(mockCamera.id));

        expect(result).toEqual(expectedState);
      });
    });
    describe('changeCountCameraInBasket', () => {
      it('should changeCountCameraInBasket with changeCountCameraInBasket action', () => {
        const initialState = {
          cart: [{...mockCamera, count:1}],
          isSuccessAddToCart: false,
          isCreateOrderSuccess: false,
          isCreateOrderFail: false,
          promocode: {
            coupon: null,
            discount: 0,
          },
          invalidCoupon: false,
          isDiscountLoading: false,
        };

        const expectedState = {
          cart: [{...mockCamera, count:10}],
          isSuccessAddToCart: false,
          isCreateOrderSuccess: false,
          isCreateOrderFail: false,
          promocode: {
            coupon: null,
            discount: 0,
          },
          invalidCoupon: false,
          isDiscountLoading: false,
        };
        const count: ChangeCount = {
          type: ChangeProductCount.SetCount,
          id: mockCamera.id,
          count: 10,
        };
        const result = basketSlice.reducer(initialState, changeCountCameraInBasket(count));

        expect(result).toEqual(expectedState);
      });
    });
    describe('resetCart', () => {
      it('should resetCart with resetCart action', () => {
        const initialState = {
          cart: mockCamerasBasket,
          isSuccessAddToCart: false,
          isCreateOrderSuccess: true,
          isCreateOrderFail: false,
          promocode: {
            coupon: null,
            discount: 0,
          },
          invalidCoupon: false,
          isDiscountLoading: false,
        };

        const expectedState = {
          cart: [],
          isSuccessAddToCart: false,
          isCreateOrderSuccess: false,
          isCreateOrderFail: false,
          promocode: {
            coupon: null,
            discount: 0,
          },
          invalidCoupon: false,
          isDiscountLoading: false,
        };
        const result = basketSlice.reducer(initialState, resetCart());

        expect(result).toEqual(expectedState);
      });
    });
    describe('closeErrorModal', () => {
      it('should closeErrorModal with closeErrorModal action', () => {
        const initialState = {
          cart: [],
          isSuccessAddToCart: false,
          isCreateOrderSuccess: false,
          isCreateOrderFail: true,
          promocode: {
            coupon: null,
            discount: 0,
          },
          invalidCoupon: false,
          isDiscountLoading: false,
        };

        const expectedState = {
          cart: [],
          isSuccessAddToCart: false,
          isCreateOrderSuccess: false,
          isCreateOrderFail: false,
          promocode: {
            coupon: null,
            discount: 0,
          },
          invalidCoupon: false,
          isDiscountLoading: false,
        };
        const result = basketSlice.reducer(initialState, closeErrorModal());

        expect(result).toEqual(expectedState);
      });
    });
    describe('fetchSendOrder', () => {

      it('should return status seccess and fail  with fetchSendOrder.fulfilled action', () => {

        const expectedState = {
          cart: [],
          isSuccessAddToCart: false,
          isCreateOrderSuccess: true,
          isCreateOrderFail: false,
          promocode: {
            coupon: null,
            discount: 0,
          },
          invalidCoupon: false,
          isDiscountLoading: false,
        };

        const result = basketSlice.reducer(
          undefined,
          fetchSendOrder.fulfilled(undefined, '', {camerasIds: [1,2,3], 'coupon': null})
        );

        expect(result).toEqual(expectedState);
      });
      it('should return status seccess and fail  with fetchSendOrder.rejected action', () => {

        const expectedState = {
          cart: [],
          isSuccessAddToCart: false,
          isCreateOrderSuccess: false,
          isCreateOrderFail: true,
          promocode: {
            coupon: null,
            discount: 0,
          },
          invalidCoupon: false,
          isDiscountLoading: false,
        };

        const result = basketSlice.reducer(
          undefined,
          fetchSendOrder.rejected(null, '', {camerasIds: [1,2,3], 'coupon': null})
        );

        expect(result).toEqual(expectedState);
      });
    });
  });
});
