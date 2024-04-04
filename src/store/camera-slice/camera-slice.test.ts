import { ChangeProductCount } from '../../const/const';
import { ChangeCount } from '../../types/types';
import { mockCamera, mockCameras, mockCamerasBasket } from '../../utils/mocks';
import { fetchCamerasAction, fetchCamerasPriceAction, fetchOneCameraAction, fetchSendOrder, fetchSimilarCamerasAction } from '../api-actions';
import { addToCart, camerasSlice, changeCountCameraInBasket, changeStatusAddToCart, closeErrorModal, deleteFromCart, dropCamera, resetCart } from './camera-slice';

describe('CameraSlice', () => {
  describe('checkSliceDefault', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        cameras: [],
        loadingCameras: false,
        oneCamera: null,
        loadingOneCamera: false,
        similarCameras: [],
        camerasFilteredByPrice: [],
        camerasFilteredByPriceLoading: false,
        cart: [],
        isSuccessAddToCart: false,
        isCreateOrderSuccess: false,
        isCreateOrderFail: false,
      };

      const result = camerasSlice.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action and undefined', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        cameras: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice:  [],
        camerasFilteredByPriceLoading: false,
        cart: [],
        isSuccessAddToCart: false,
        isCreateOrderSuccess: false,
        isCreateOrderFail: false,
      };

      const result = camerasSlice.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });
  });
  describe('dropCamera', () => {
    it('should dropCamera with dropCamera action', () => {
      const initialState = {
        cameras: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: mockCamera,
        similarCameras: [],
        camerasFilteredByPrice: [],
        camerasFilteredByPriceLoading: false,
        cart: [],
        isSuccessAddToCart: false,
        isCreateOrderSuccess: false,
        isCreateOrderFail: false,
      };

      const expectedState = {
        cameras: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice: [],
        camerasFilteredByPriceLoading: false,
        cart: [],
        isSuccessAddToCart: false,
        isCreateOrderSuccess: false,
        isCreateOrderFail: false,
      };

      const result = camerasSlice.reducer(initialState, dropCamera());

      expect(result).toEqual(expectedState);
    });
  });
  describe('changeStatusAddToCart', () => {
    it('should changeStatusAddToCart with changeStatusAddToCart action', () => {
      const initialState = {
        cameras: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice: [],
        camerasFilteredByPriceLoading: false,
        cart: [],
        isSuccessAddToCart: false,
        isCreateOrderSuccess: false,
        isCreateOrderFail: false,
      };

      const expectedState = {
        cameras: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice: [],
        camerasFilteredByPriceLoading: false,
        cart: [],
        isSuccessAddToCart: true,
        isCreateOrderSuccess: false,
        isCreateOrderFail: false,
      };

      const result = camerasSlice.reducer(initialState, changeStatusAddToCart());

      expect(result).toEqual(expectedState);
    });
  });
  describe('addToCart', () => {
    it('should addToCart with addToCart action', () => {
      const initialState = {
        cameras: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice: [],
        camerasFilteredByPriceLoading: false,
        cart: [{...mockCamera, count:1}],
        isSuccessAddToCart: false,
        isCreateOrderSuccess: false,
        isCreateOrderFail: false,
      };

      const expectedState = {
        cameras: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice: [],
        camerasFilteredByPriceLoading: false,
        cart: [{...mockCamera, count:2}],
        isSuccessAddToCart: true,
        isCreateOrderSuccess: false,
        isCreateOrderFail: false,
      };

      const result = camerasSlice.reducer(initialState, addToCart(mockCamera));

      expect(result).toEqual(expectedState);
    });
  });
  describe('deleteFromCart', () => {
    it('should deleteFromCart with deleteFromCart action', () => {
      const initialState = {
        cameras: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice: [],
        camerasFilteredByPriceLoading: false,
        cart: [{...mockCamera, count:1}],
        isSuccessAddToCart: false,
        isCreateOrderSuccess: false,
        isCreateOrderFail: false,
      };

      const expectedState = {
        cameras: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice: [],
        camerasFilteredByPriceLoading: false,
        cart: [],
        isSuccessAddToCart: false,
        isCreateOrderSuccess: false,
        isCreateOrderFail: false,
      };

      const result = camerasSlice.reducer(initialState, deleteFromCart(mockCamera.id));

      expect(result).toEqual(expectedState);
    });
  });
  describe('changeCountCameraInBasket', () => {
    it('should changeCountCameraInBasket with changeCountCameraInBasket action', () => {
      const initialState = {
        cameras: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice: [],
        camerasFilteredByPriceLoading: false,
        cart: [{...mockCamera, count:1}],
        isSuccessAddToCart: false,
        isCreateOrderSuccess: false,
        isCreateOrderFail: false,
      };

      const expectedState = {
        cameras: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice: [],
        camerasFilteredByPriceLoading: false,
        cart: [{...mockCamera, count:10}],
        isSuccessAddToCart: false,
        isCreateOrderSuccess: false,
        isCreateOrderFail: false,
      };
      const count: ChangeCount = {
        type: ChangeProductCount.SetCount,
        id: mockCamera.id,
        count: 10,
      };
      const result = camerasSlice.reducer(initialState, changeCountCameraInBasket(count));

      expect(result).toEqual(expectedState);
    });
  });
  describe('resetCart', () => {
    it('should resetCart with resetCart action', () => {
      const initialState = {
        cameras: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice: [],
        camerasFilteredByPriceLoading: false,
        cart: mockCamerasBasket,
        isSuccessAddToCart: false,
        isCreateOrderSuccess: true,
        isCreateOrderFail: false,
      };

      const expectedState = {
        cameras: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice: [],
        camerasFilteredByPriceLoading: false,
        cart: [],
        isSuccessAddToCart: false,
        isCreateOrderSuccess: false,
        isCreateOrderFail: false,
      };
      const result = camerasSlice.reducer(initialState, resetCart());

      expect(result).toEqual(expectedState);
    });
  });
  describe('closeErrorModal', () => {
    it('should closeErrorModal with closeErrorModal action', () => {
      const initialState = {
        cameras: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice: [],
        camerasFilteredByPriceLoading: false,
        cart: [],
        isSuccessAddToCart: false,
        isCreateOrderSuccess: false,
        isCreateOrderFail: true,
      };

      const expectedState = {
        cameras: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice: [],
        camerasFilteredByPriceLoading: false,
        cart: [],
        isSuccessAddToCart: false,
        isCreateOrderSuccess: false,
        isCreateOrderFail: false,
      };
      const result = camerasSlice.reducer(initialState, closeErrorModal());

      expect(result).toEqual(expectedState);
    });
  });
  describe('fetchCamerasAction', () => {

    it('should return products array with fetchCamerasAction.fulfilled action', () => {
      const expectedState = {
        cameras: [...mockCameras],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice: [],
        camerasFilteredByPriceLoading: false,
        cart: [],
        isSuccessAddToCart: false,
        isCreateOrderSuccess: false,
        isCreateOrderFail: false,
      };

      const result = camerasSlice.reducer(
        undefined,
        fetchCamerasAction.fulfilled(
          mockCameras, '', undefined)
      );

      expect(result).toEqual(expectedState);
    });
    it('should return loadingCameras = true with fetchCamerasAction.pending action', () => {
      const expectedState = {
        cameras: [],
        loadingCameras: true,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice: [],
        camerasFilteredByPriceLoading: false,
        cart: [],
        isSuccessAddToCart: false,
        isCreateOrderSuccess: false,
        isCreateOrderFail: false,
      };

      const result = camerasSlice.reducer(
        undefined,
        fetchCamerasAction.pending);

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchCamerasPriceAction', () => {
    it('should return cameras array on filter price with fetchCamerasPriceAction.fulfilled action', () => {
      const expectedState = {
        cameras: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice: mockCameras,
        camerasFilteredByPriceLoading: false,
        cart: [],
        isSuccessAddToCart: false,
        isCreateOrderSuccess: false,
        isCreateOrderFail: false,
      };
      const result = camerasSlice.reducer(
        undefined,
        fetchCamerasPriceAction.fulfilled(mockCameras, '', {from: 2000, to: 5000})
      );
      expect(result).toEqual(expectedState);
    });
    it('should return cameras array on filter price with fetchCamerasPriceAction.pending action', () => {
      const expectedState = {
        cameras: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice: [],
        camerasFilteredByPriceLoading: true,
        cart: [],
        isSuccessAddToCart: false,
        isCreateOrderSuccess: false,
        isCreateOrderFail: false,
      };
      const result = camerasSlice.reducer(
        undefined,
        fetchCamerasPriceAction.pending('', {...mockCameras, from: 2000, to: 5000}, {from: 2000, to: 5000})
      );
      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchOneCameraAction', () => {
    it('should return camera object with fetchOneCameraAction action', () => {
      const id = mockCamera.id;

      const expectedState = {
        cameras: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: mockCamera,
        similarCameras: [],
        camerasFilteredByPrice: [],
        camerasFilteredByPriceLoading: false,
        cart: [],
        isSuccessAddToCart: false,
        isCreateOrderSuccess: false,
        isCreateOrderFail: false,
      };

      const result = camerasSlice.reducer(
        undefined,
        fetchOneCameraAction.fulfilled(
          mockCamera, '', id)
      );

      expect(result).toEqual(expectedState);
    });
    it('should return loadingOneCamera=true with fetchOneCameraAction.pending action', () => {
      const id = mockCamera.id;

      const expectedState = {
        cameras: [],
        loadingCameras: false,
        loadingOneCamera: true,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice: [],
        camerasFilteredByPriceLoading: false,
        cart: [],
        isSuccessAddToCart: false,
        isCreateOrderSuccess: false,
        isCreateOrderFail: false,
      };

      const result = camerasSlice.reducer(
        undefined,
        fetchOneCameraAction.pending(
          '', id, undefined)
      );

      expect(result).toEqual(expectedState);
    });
  });
  describe('fetchSimilarCamerasAction', () => {

    it('should return similar cameras array with fetchSimilarCamerasAction action', () => {
      const id = mockCamera.id;

      const expectedState = {
        cameras: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [...mockCameras],
        camerasFilteredByPrice: [],
        camerasFilteredByPriceLoading: false,
        cart: [],
        isSuccessAddToCart: false,
        isCreateOrderSuccess: false,
        isCreateOrderFail: false,
      };

      const result = camerasSlice.reducer(
        undefined,
        fetchSimilarCamerasAction.fulfilled(
          mockCameras, '', id)
      );

      expect(result).toEqual(expectedState);
    });
  });
  describe('fetchSendOrder', () => {

    it('should return status seccess and fail  with fetchSendOrder.fulfilled action', () => {

      const expectedState = {
        cameras: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice: [],
        camerasFilteredByPriceLoading: false,
        cart: [],
        isSuccessAddToCart: false,
        isCreateOrderSuccess: true,
        isCreateOrderFail: false,
      };

      const result = camerasSlice.reducer(
        undefined,
        fetchSendOrder.fulfilled(undefined, '', {camerasIds: [1,2,3], 'coupon': null})
      );

      expect(result).toEqual(expectedState);
    });
    it('should return status seccess and fail  with fetchSendOrder.rejected action', () => {

      const expectedState = {
        cameras: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice: [],
        camerasFilteredByPriceLoading: false,
        cart: [],
        isSuccessAddToCart: false,
        isCreateOrderSuccess: false,
        isCreateOrderFail: true,
      };

      const result = camerasSlice.reducer(
        undefined,
        fetchSendOrder.rejected(null, '', {camerasIds: [1,2,3], 'coupon': null})
      );

      expect(result).toEqual(expectedState);
    });
  });
});

