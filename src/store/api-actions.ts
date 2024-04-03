import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { Camera, Id, Item, OrderData, Promocode, Review, ReviewAdding } from '../types/types';
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

export const fetchCamerasPriceAction = createAsyncThunk<
  Camera[],
  {from: Camera['price']; to: Camera['price']},
  AsyncActionType
>(
  `${NameSpace.Camera}/fetchPriceFilteredCameras`,
  async ({from, to}, {extra: api}) => {
    const {data} = await api.get<Camera[]>(`${APIRoute.Cameras}?price_gte=${from}&price_lte=${to}`);

    return data;
  }
);

export const fetchPromoAction = createAsyncThunk<
  Item[],
  undefined,
  AsyncActionType
>(
  `${NameSpace.Promo}/fetchPromo`,
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Item[]>(APIRoute.Promo);

    return data;
  }
);

export const fetchOneCameraAction = createAsyncThunk<
  Camera,
  Id,
  AsyncActionType
>(
  `${NameSpace.Camera}/fetchOneCamera`,
  async (id, {extra: api}) => {
    const {data} = await api.get<Camera>(`${APIRoute.Cameras}/${id}`);

    return data;
  }
);

export const fetchSimilarCamerasAction = createAsyncThunk<
  Camera[],
  Id,
  AsyncActionType
>(
  `${NameSpace.Similar}/fetchSimilarCameras`,
  async (id, {extra: api}) => {
    const {data} = await api.get<Camera[]>(`${APIRoute.Cameras}/${id}${APIRoute.Similar}`);

    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<
  Review[],
  Id,
  AsyncActionType
>(
  `${NameSpace.Review}/fetchReviews`,
  async (id, {extra: api}) => {
    const {data} = await api.get<Review[]>(`${APIRoute.Cameras}/${id}${APIRoute.Reviews}`);

    return data;
  }
);

export const fetchAddReviewAction = createAsyncThunk<
  Review,
  ReviewAdding,
  AsyncActionType
>(
  `${NameSpace.Review}/fetchAddReview`,
  async (arg, { extra: api }) => {
    const { data } = await api.post<Review>(APIRoute.Reviews, arg);

    return data;
  },
);

export const fetchDiscountAction = createAsyncThunk<
  Promocode['discount'],
  Promocode['coupon'],
  AsyncActionType
>(
  `${NameSpace.Coupon}/fetchDiscount`,
  async(coupon, {extra: api}) => {
    const {data} = await api.post<Promocode['discount']>(APIRoute.Coupons, {'coupon': coupon});

    return data;
  }
);

export const fetchSendOrder = createAsyncThunk<
  void,
  OrderData,
  AsyncActionType
>(
  `${NameSpace.Order}/fetchSendOrder`,
  async (data, { extra: api }) => {
    await api.post(APIRoute.Orders, data);
  },
);
