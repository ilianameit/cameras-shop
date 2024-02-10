import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const/const';
import { camerasSlice } from './camera-slice/camera-slice';
import { appSlice } from './app-slice/app-slice';

export const rootReducer = combineReducers({
  [NameSpace.Camera]: camerasSlice.reducer,
  [NameSpace.App]: appSlice.reducer,
});
