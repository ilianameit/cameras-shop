import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { Camera } from '../types/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, NameSpace } from '../const/const';

type AsyncActionType = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const fetchCamerasAction = createAsyncThunk<
  Camera[],
  undefined,
  AsyncActionType
>(
  `${NameSpace.Camera}/fetchCameras`,
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Camera[]>(APIRoute.Cameras);

    return data;
  }
);
