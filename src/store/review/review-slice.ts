import { createSlice } from '@reduxjs/toolkit';
import { Review } from '../../types/types';
import { NameSpace } from '../../const/const';
import { fetchAddReviewAction, fetchReviewsAction } from '../api-actions';

type ReviewStateType = {
  reviews: Review[];
  isLoadingReview: boolean;
  isAddReviewSucces: boolean;
}

const initialState: ReviewStateType = {
  reviews: [],
  isLoadingReview: false,
  isAddReviewSucces: false,
};

export const reviewSlice = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {
    changeAddReviewIsSucces: (state) => {
      state.isAddReviewSucces = !state.isAddReviewSucces;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchAddReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.isLoadingReview = false;
        state.isAddReviewSucces = true;
      })
      .addCase(fetchAddReviewAction.pending, (state) => {
        state.isLoadingReview = true;
      })
      .addCase(fetchAddReviewAction.rejected, (state) => {
        state.isLoadingReview = false;
        state.isAddReviewSucces = false;
      });
  },
});

export const { changeAddReviewIsSucces } = reviewSlice.actions;
