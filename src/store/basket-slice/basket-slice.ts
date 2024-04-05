import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ChangeProductCount, MAX_COUNT_ITEM_BASKET, MIN_COUNT_ITEM_BASKET, NAME_KEY_CAMERAS_STORAGE, NAME_KEY_COUPON_STORAGE, NameSpace } from '../../const/const';
import { Camera, CameraBasket, ChangeCount, CouponName, Promocode } from '../../types/types';
import { fetchDiscountAction, fetchSendOrder } from '../api-actions';
import { getCamerasFromLocalStorage, getCouponFromLocalStorage } from '../../utils/common';

type BasketStateType = {
  promocode: Promocode;
  isDiscountLoading: boolean;
  invalidCoupon: boolean;
  cart: CameraBasket[];
  isSuccessAddToCart: boolean;
  isCreateOrderSuccess: boolean;
  isCreateOrderFail: boolean;
}

const initialState: BasketStateType = {
  cart: JSON.parse(localStorage.getItem(NAME_KEY_CAMERAS_STORAGE) ?? '[]') as CameraBasket[] || [],
  isSuccessAddToCart: false,
  isCreateOrderSuccess: false,
  isCreateOrderFail: false,
  promocode: {
    coupon:  JSON.parse(localStorage.getItem(NAME_KEY_COUPON_STORAGE) ?? 'null') as Promocode['coupon'] || null,
    discount: 0,
  },
  isDiscountLoading: false,
  invalidCoupon: false,
};

export const basketSlice = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Camera>) => {
      const camerasInCart = state.cart;
      const camera = action.payload;
      const findDuplicateCameraIndex = camerasInCart.findIndex((cameraCart) => cameraCart.id === camera.id);

      if(findDuplicateCameraIndex !== -1) {
        const duplicateCamera = camerasInCart[findDuplicateCameraIndex];
        duplicateCamera.count = duplicateCamera.count + 1;
        state.cart.splice(findDuplicateCameraIndex, 1, duplicateCamera);
        getCamerasFromLocalStorage(state.cart);
      } else {
        state.cart.push({...camera, count: 1});
        getCamerasFromLocalStorage(state.cart);
      }
      state.isSuccessAddToCart = !state.isSuccessAddToCart;
    },
    deleteFromCart: (state, action: PayloadAction<Camera['id']>) => {
      state.cart = state.cart.filter((product) => product.id !== action.payload);
      getCamerasFromLocalStorage(state.cart);
    },
    changeCountCameraInBasket: (state, action: PayloadAction<ChangeCount>) => {
      const payload = action.payload;
      const newCount = payload.count;
      const idCamera = payload.id;
      const camerasInCart = state.cart;

      const findCameraIndex = camerasInCart.findIndex((cameraCart) => cameraCart.id === idCamera);

      if(findCameraIndex !== -1) {
        let camera = camerasInCart[findCameraIndex];

        if(newCount && payload.type === ChangeProductCount.SetCount){
          if(MIN_COUNT_ITEM_BASKET <= newCount && newCount <= MAX_COUNT_ITEM_BASKET){
            camera = {...camera, count: newCount};
          }
        }
        if(payload.type === ChangeProductCount.Increase && camera.count < MAX_COUNT_ITEM_BASKET) {
          camera = {...camera, count: ++camera.count};
        }
        if(payload.type === ChangeProductCount.Decrease && camera.count > MIN_COUNT_ITEM_BASKET){
          camera = {...camera, count: --camera.count};
        }

        state.cart.splice(findCameraIndex, 1, camera);
        getCamerasFromLocalStorage(state.cart);
      }
    },
    resetCart: (state) => {
      state.isCreateOrderSuccess = false;
      state.cart = [];
      getCamerasFromLocalStorage([]);
    },
    changeStatusAddToCart: (state) => {
      state.isSuccessAddToCart = !state.isSuccessAddToCart;
    },
    closeErrorModal: (state) => {
      state.isCreateOrderFail = false;
    },
    setCouponName: (state, action: PayloadAction<CouponName | null>) => {
      state.promocode.coupon = action.payload;
      getCouponFromLocalStorage(state.promocode.coupon);
    },
    resetPromocode: (state) => {
      state.promocode = {
        coupon: null,
        discount: 0,
      };
      getCouponFromLocalStorage(state.promocode.coupon);
      state.invalidCoupon = false;
    },
  },
  extraReducers(builder) {
    builder
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
      })
      .addCase(fetchSendOrder.fulfilled, (state) => {
        state.isCreateOrderSuccess = true;
        state.isCreateOrderFail = false;
      })
      .addCase(fetchSendOrder.rejected, (state) => {
        state.isCreateOrderSuccess = false;
        state.isCreateOrderFail = true;
      });
  },
});


export const { setCouponName, resetPromocode, addToCart, changeStatusAddToCart, deleteFromCart, changeCountCameraInBasket, resetCart, closeErrorModal } = basketSlice.actions;
