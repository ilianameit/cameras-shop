import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { fetchReviewsAction, fetchAddReviewAction, fetchCamerasAction, fetchPromoAction, fetchOneCameraAction, fetchSimilarCamerasAction, fetchCamerasPriceAction, fetchDiscountAction, fetchSendOrder } from './api-actions';
import { APIRoute } from '../const/const';
import { extractActionsTypes, AppThunkDispatch } from '../utils/mocks';
import { OrderData, Promocode, ReviewAdding } from '../types/types';
import { State } from '../types/state';

describe('API ACTIONS', () => {

  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({CAMERA: { cameras: [] }, REVIEW: {} });
  });

  describe('fetchCamerasAction', () => {

    it('should dispatch fetchCamerasAction.pending and fetchCamerasAction.fulfilled with thunk fetchCamerasAction', async () => {
      mockAxiosAdapter.onGet(APIRoute.Cameras).reply(200);

      await store.dispatch((fetchCamerasAction()));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCamerasAction.pending.type,
        fetchCamerasAction.fulfilled.type
      ]);
    });

  });
  describe('fetchCamerasPriceAction', () => {
    it('should dispatch fetchCamerasPriceAction.fulfilled  with thunk fetchCamerasPriceAction', async () => {
      const from = 2000;
      const to = 5000;
      mockAxiosAdapter.onGet(`${APIRoute.Cameras}?price_gte=${from}&price_lte=${to}`).reply(200);

      await store.dispatch((fetchCamerasPriceAction({from, to})));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCamerasPriceAction.pending.type,
        fetchCamerasPriceAction.fulfilled.type
      ]);
    });
  });
  describe('fetchPromoAction', () => {

    it('should dispatch fetchPromoAction.pending and fetchPromoAction.fulfilled with thunk fetchPromoAction', async () => {
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(200);

      await store.dispatch((fetchPromoAction()));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchPromoAction.pending.type,
        fetchPromoAction.fulfilled.type
      ]);
    });

  });


  describe('fetchOneCameraAction', () => {

    it('should dispatch fetchOneCameraAction.pending and fetchOneCameraAction.fulfilled with thunk fetchOneCameraAction',
      async () => {

        const id = 1;
        mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${id}`).reply(200);

        await store.dispatch((fetchOneCameraAction(id)));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchOneCameraAction.pending.type,
          fetchOneCameraAction.fulfilled.type
        ]);
      });

  });

  describe('fetchSimilarCamerasAction', () => {

    it('should dispatch fetchSimilarCamerasAction.pending and fetchSimilarCamerasAction.fulfilled with thunk fetchSimilarCamerasAction',
      async () => {

        const id = 1;
        mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${id}${APIRoute.Similar}`).reply(200);

        await store.dispatch((fetchSimilarCamerasAction(id)));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchSimilarCamerasAction.pending.type,
          fetchSimilarCamerasAction.fulfilled.type
        ]);
      });

  });

  describe('fetchReviewsAction', () => {

    it('should dispatch fetchReviewsAction.pending and fetchReviewsAction.fulfilled with thunk fetchReviewsAction',
      async () => {

        const id = 1;
        mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${id}${APIRoute.Reviews}`).reply(200);

        await store.dispatch((fetchReviewsAction(id)));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchReviewsAction.pending.type,
          fetchReviewsAction.fulfilled.type
        ]);
      });

  });

  describe('fetchAddReviewAction', () => {

    it('should dispatch fetchAddReviewAction.pending and fetchAddReviewAction.fulfilled with thunk fetchAddReviewAction',
      async () => {

        const data: ReviewAdding = {
          cameraId: 1,
          userName: 'Mana',
          advantage: 'plus',
          disadvantage: 'minus',
          review: 'rare camera',
          rating: 5
        };

        mockAxiosAdapter.onPost(APIRoute.Reviews).reply(200);

        await store.dispatch((fetchAddReviewAction(data)));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchAddReviewAction.pending.type,
          fetchAddReviewAction.fulfilled.type
        ]);
      });

  });

  describe('fetchDiscountAction', () => {
    it('should dispatch fetchDiscountAction.pending and fetchDiscountAction.fulfilled with thunk fetchDiscountAction',
      async () => {
        const data : Promocode['coupon'] = 'camera-333';
        mockAxiosAdapter.onPost(APIRoute.Coupons).reply(200);

        await store.dispatch((fetchDiscountAction(data)));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchDiscountAction.pending.type,
          fetchDiscountAction.fulfilled.type
        ]);
      });
  });
  describe('fetchSendOrder', () => {
    it('should dispatch fetchSendOrder.pending and fetchSendOrder.fulfilled with thunk fetchSendOrder',
      async () => {
        const data : OrderData = {camerasIds: [1,2,3], coupon: null};
        mockAxiosAdapter.onPost(APIRoute.Orders).reply(200);

        await store.dispatch((fetchSendOrder(data)));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchSendOrder.pending.type,
          fetchSendOrder.fulfilled.type,
        ]);
      });
  });

});
