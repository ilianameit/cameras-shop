import { mockCamera, mockReview } from '../../utils/mocks';
import { fetchAddReviewAction, fetchReviewsAction } from '../api-actions';
import { reviewSlice } from './review-slice';

describe('ReviewSlice', () => {
  describe('checkSliceDefault', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        reviews: [],
        isLoadingReview: false,
        isAddReviewSuccess: false,
      };

      const result = reviewSlice.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });
    it('should return default initial state with empty action and undefined', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        reviews: [],
        isLoadingReview: false,
        isAddReviewSuccess: false,
      };

      const result = reviewSlice.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });
  });
  describe('fetchReviewsAction', () => {

    it('should return reviews array with fetchReviewsAction action', () => {
      const id = mockCamera.id;

      const expectedState = {
        reviews: [mockReview],
        isLoadingReview: false,
        isAddReviewSuccess: false,
      };

      const result = reviewSlice.reducer(
        undefined,
        fetchReviewsAction.fulfilled(
          [mockReview], '', id)
      );

      expect(result).toEqual(expectedState);
    });
  });
  describe('fetchAddReviewAction', () => {
    const reviewData = {
      cameraId: 1,
      userName: 'Никита',
      advantage: 'не нашел',
      disadvantage: 'мылит',
      review: 'разбитая',
      rating: 1
    };
    it('should push review in reviews array and isAddReviewSucces = true with fetchAddReviewAction action.fulfilled', () => {
      const expectedState = {
        reviews: [mockReview],
        isLoadingReview: false,
        isAddReviewSuccess: true,
      };

      const result = reviewSlice.reducer(
        undefined,
        fetchAddReviewAction.fulfilled(
          mockReview, '', reviewData)
      );

      expect(result).toEqual(expectedState);
    });
    it('should isLoadingReview=true with fetchAddReviewAction action.pending', () => {
      const expectedState = {
        reviews: [],
        isLoadingReview: true,
        isAddReviewSuccess: false,
      };

      const result = reviewSlice.reducer(
        undefined,
        fetchAddReviewAction.pending(
          '', reviewData, undefined)
      );

      expect(result).toEqual(expectedState);
    });
  });
});
