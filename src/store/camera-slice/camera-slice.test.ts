import { mockCamera, mockCameras, mockPromo } from '../../utils/mocks';
import { fetchCamerasAction, fetchCamerasPriceAction, fetchOneCameraAction, fetchPromoAction, fetchSimilarCamerasAction } from '../api-actions';
import { camerasSlice, dropCamera } from './camera-slice';

describe('CameraSlice', () => {
  describe('checkSliceDefault', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        cameras: [],
        promo: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice: [],
      };

      const result = camerasSlice.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action and undefined', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        cameras: [],
        promo: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice:  []
      };

      const result = camerasSlice.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });
  });
  describe('dropCamera', () => {
    it('should dropCamera with dropCamera action', () => {
      const initialState = {
        cameras: [],
        promo: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: mockCamera,
        similarCameras: [],
        camerasFilteredByPrice: [],
      };

      const expectedState = {
        cameras: [],
        promo: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice: [],
      };

      const result = camerasSlice.reducer(initialState, dropCamera());

      expect(result).toEqual(expectedState);
    });
  });
  describe('fetchCamerasAction', () => {

    it('should return products array with fetchCamerasAction action', () => {
      const expectedState = {
        cameras: [...mockCameras],
        promo: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice: [],
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
        promo: [],
        loadingCameras: true,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice: [],
      };

      const result = camerasSlice.reducer(
        undefined,
        fetchCamerasAction.pending);

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchCamerasPriceAction', () => {
    it('should return cameras array on filter price with fetchCamerasPriceAction action', () => {
      const expectedState = {
        cameras: [],
        promo: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice: mockCameras,
      };
      const result = camerasSlice.reducer(
        undefined,
        fetchCamerasPriceAction.fulfilled(mockCameras, '', {from: 2000, to: 5000})
      );
      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchPromoAction', () => {
    it('should return promo array with fetchPromoAction action', () => {
      const expectedState = {
        cameras: [],
        promo: [...mockPromo],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice: [],
      };
      const result = camerasSlice.reducer(
        undefined,
        fetchPromoAction.fulfilled(
          mockPromo, '', undefined)
      );
      expect(result).toEqual(expectedState);
    });
  });
  describe('fetchOneCameraAction', () => {
    it('should return camera object with fetchOneCameraAction action', () => {
      const id = mockCamera.id;

      const expectedState = {
        cameras: [],
        promo: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: mockCamera,
        similarCameras: [],
        camerasFilteredByPrice: [],
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
        promo: [],
        loadingCameras: false,
        loadingOneCamera: true,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice: [],
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
        promo: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [...mockCameras],
        camerasFilteredByPrice: [],
      };

      const result = camerasSlice.reducer(
        undefined,
        fetchSimilarCamerasAction.fulfilled(
          mockCameras, '', id)
      );

      expect(result).toEqual(expectedState);
    });
  });
});
