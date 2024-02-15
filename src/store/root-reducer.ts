import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const/const';
import { camerasSlice } from './camera-slice/camera-slice';
import { reviewSlice } from './review/review-slice';

export const rootReducer = combineReducers({
  [NameSpace.Camera]: camerasSlice.reducer,
  [NameSpace.Review]: reviewSlice.reducer,
});
