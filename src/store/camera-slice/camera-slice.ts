import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const/const';
import { Camera, Item } from '../../types/types';
import { fetchCamerasAction, fetchPromoAction } from '../api-actions';

type CamerasStateType = {
  cameras: Camera[];
  promo: Item[];
}

const initialState: CamerasStateType = {
  cameras: [],
  promo: [],
};

export const camerasSlice = createSlice({
  name: NameSpace.Camera,
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
      });
  },
});
