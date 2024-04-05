import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import Banner from './banner';
import { MockStore, mockPromo } from '../../utils/mocks';
import { NameSpace } from '../../const/const';

describe('Component Banner', () => {
  describe('should render correctly',() => {
    it('should render slides', () => {
      const { withStoreComponent } = withStore(<Banner />, MockStore({[NameSpace.Promo]: {
        promo: mockPromo,
      }}));

      const preparedComponent = withHistory(withStoreComponent);
      render(preparedComponent);
      const slides = screen.getAllByTestId(/slide/i);
      const slidesImg = screen.getAllByAltText(/баннер/i);

      expect(slides).toHaveLength(3);
      expect(slidesImg).toHaveLength(3);

    });

  });

});
