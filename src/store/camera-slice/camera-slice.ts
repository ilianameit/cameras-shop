import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const/const';
import { Camera } from '../../types/types';
import { fetchCamerasAction, fetchCamerasPriceAction, fetchOneCameraAction, fetchSimilarCamerasAction } from '../api-actions';

type CamerasStateType = {
  cameras: Camera[];
  loadingCameras: boolean;
  oneCamera: Camera | null;
  loadingOneCamera: boolean;
  similarCameras: Camera[];
  camerasFilteredByPrice: Camera[];
  camerasFilteredByPriceLoading: boolean;
}

const initialState: CamerasStateType = {
  cameras: [],
  loadingCameras: false,
  oneCamera: null,
  loadingOneCamera: false,
  similarCameras: [],
  camerasFilteredByPrice: [],
  camerasFilteredByPriceLoading: false,
};

export const camerasSlice = createSlice({
  name: NameSpace.Camera,
  initialState,
  reducers: {
    dropCamera: (state) => {
      state.oneCamera = null;
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

export const { dropCamera } = camerasSlice.actions;
