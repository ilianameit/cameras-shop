import { mockCamera, mockCameras } from '../../utils/mocks';
import { fetchCamerasAction, fetchCamerasPriceAction, fetchOneCameraAction, fetchSimilarCamerasAction } from '../api-actions';
import { camerasSlice, dropCamera } from './camera-slice';

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
      };

      const expectedState = {
        cameras: [],
        loadingCameras: false,
        loadingOneCamera: false,
        oneCamera: null,
        similarCameras: [],
        camerasFilteredByPrice: [],
        camerasFilteredByPriceLoading: false,
      };

      const result = camerasSlice.reducer(initialState, dropCamera());

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

