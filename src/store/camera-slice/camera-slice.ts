import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const/const';
import { Camera } from '../../types/types';
import { fetchCamerasAction } from '../api-actions';

type CamerasStateType = {
  cameras: Camera[];
}

const initialState: CamerasStateType = {
  cameras: [],
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
      });
  },
});
