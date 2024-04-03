import { createSlice } from '@reduxjs/toolkit';
import { Review } from '../../types/types';
import { NameSpace } from '../../const/const';
import { fetchAddReviewAction, fetchReviewsAction } from '../api-actions';

type ReviewStateType = {
  reviews: Review[];
  isLoadingReview: boolean;
  isAddReviewSuccess: boolean;
}

const initialState: ReviewStateType = {
  reviews: [],
  isLoadingReview: false,
  isAddReviewSuccess: false,
};

export const reviewSlice = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {
    changeAddReviewIsSucces: (state) => {
      state.isAddReviewSuccess = !state.isAddReviewSuccess;
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
        state.isAddReviewSuccess = true;
      })
      .addCase(fetchAddReviewAction.pending, (state) => {
        state.isLoadingReview = true;
      })
      .addCase(fetchAddReviewAction.rejected, (state) => {
        state.isLoadingReview = false;
        state.isAddReviewSuccess = false;
      });
  },
});

export const { changeAddReviewIsSucces } = reviewSlice.actions;
