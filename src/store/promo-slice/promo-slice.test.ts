import { mockPromo } from '../../utils/mocks';
import { fetchPromoAction } from '../api-actions';
import { promoSlice } from './promo-slice';

describe('PromoSlice', () => {
  describe('checkSliceDefault', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        promo: [],
      };

      const result = promoSlice.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action and undefined', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        promo: [],
      };

      const result = promoSlice.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchPromoAction', () => {

    it('should return promo array with fetchPromoAction.fulfilled action', () => {
      const expectedState = {
        promo: [...mockPromo],
      };

      const result = promoSlice.reducer(
        undefined,
        fetchPromoAction.fulfilled(
          mockPromo, '', undefined)
      );

      expect(result).toEqual(expectedState);
    });

  });
});
