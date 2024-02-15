import { createSlice } from '@reduxjs/toolkit';
import { Review } from '../../types/types';
import { NameSpace } from '../../const/const';
import { fetchReviewsAction } from '../api-actions';

type ReviewStateType = {
  reviews: Review[];
}

const initialState: ReviewStateType = {
  reviews: [],
};

export const reviewSlice = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  },
});

