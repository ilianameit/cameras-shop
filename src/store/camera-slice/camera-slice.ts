import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const/const';
import { Camera, Item } from '../../types/types';
import { fetchCamerasAction, fetchOneCameraAction, fetchPromoAction } from '../api-actions';

type CamerasStateType = {
  cameras: Camera[];
  promo: Item[];
  loadingCameras: boolean;
  oneCamera: Camera | null;
  loadingOneCamera: boolean;
}

const initialState: CamerasStateType = {
  cameras: [],
  promo: [],
  loadingCameras: false,
  oneCamera: null,
  loadingOneCamera: false,
};

export const camerasSlice = createSlice({
  name: NameSpace.Camera,
  initialState,
  reducers: {
    dropCamera: (state) => {
      state.oneCamera = null;
    }
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
      });
  },
});

export const {dropCamera} = camerasSlice.actions;
