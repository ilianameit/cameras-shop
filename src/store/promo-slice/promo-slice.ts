import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const/const';
import { Item } from '../../types/types';
import { fetchPromoAction } from '../api-actions';

type PromoStateType = {
  promo: Item[];
}

const initialState: PromoStateType = {
  promo: [],
};

export const promoSlice = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
      });
  },
});
