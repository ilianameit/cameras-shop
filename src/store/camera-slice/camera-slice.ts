import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ChangeProductCount, MAX_COUNT_ITEM_BASKET, MIN_COUNT_ITEM_BASKET, NAME_KEY_CAMERAS_STORAGE, NameSpace } from '../../const/const';
import { Camera, CameraBasket, Item } from '../../types/types';
import { fetchCamerasAction, fetchCamerasPriceAction, fetchOneCameraAction, fetchPromoAction, fetchSimilarCamerasAction } from '../api-actions';
import { getCamerasFromLocalStorage } from '../../utils/common';

type ChangeCount = {
  type: ChangeProductCount;
  id: CameraBasket['id'];
  count?: number;
}

type CamerasStateType = {
  cameras: Camera[];
  promo: Item[];
  loadingCameras: boolean;
  oneCamera: Camera | null;
  loadingOneCamera: boolean;
  similarCameras: Camera[];
  camerasFilteredByPrice: Camera[];
  camerasFilteredByPriceLoading: boolean;
  cart: CameraBasket[];
  isSuccessAddToCart: boolean;
}

const initialState: CamerasStateType = {
  cameras: [],
  promo: [],
  loadingCameras: false,
  oneCamera: null,
  loadingOneCamera: false,
  similarCameras: [],
  camerasFilteredByPrice: [],
  camerasFilteredByPriceLoading: false,
  cart: JSON.parse(localStorage.getItem(NAME_KEY_CAMERAS_STORAGE) || '[]') as CameraBasket[],
  isSuccessAddToCart: false,
};

export const camerasSlice = createSlice({
  name: NameSpace.Camera,
  initialState,
  reducers: {
    dropCamera: (state) => {
      state.oneCamera = null;
    },
    changeStatusAddToCart: (state) => {
      state.isSuccessAddToCart = !state.isSuccessAddToCart;
    },
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
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.loadingCameras = false;
      })
      .addCase(fetchCamerasAction.pending, (state) => {
        state.loadingCameras = true;
      })
      .addCase(fetchCamerasPriceAction.fulfilled, (state, action) => {
        state.camerasFilteredByPrice = action.payload;
        state.camerasFilteredByPriceLoading = false;
      })
      .addCase(fetchCamerasPriceAction.pending, (state) => {
        state.camerasFilteredByPriceLoading = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
      })
      .addCase(fetchOneCameraAction.fulfilled, (state, action) => {
        state.oneCamera = action.payload;
      })
      .addCase(fetchOneCameraAction.pending, (state) => {
        state.loadingOneCamera = true;
      })
      .addCase(fetchOneCameraAction.rejected, (state) => {
        state.loadingOneCamera = false;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
      });
  },
});

export const { dropCamera, addToCart, changeStatusAddToCart, deleteFromCart, changeCountCameraInBasket } = camerasSlice.actions;
