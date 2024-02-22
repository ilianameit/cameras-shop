import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import Banner from './banner';
import { mockPromo } from '../../utils/mocks';
import { NameSpace } from '../../const/const';

describe('Component Banner', () => {
  describe('should render correctly',() => {
    it('should render slides', () => {
      const { withStoreComponent } = withStore(<Banner />, {[NameSpace.Camera]: {
        promo: mockPromo,
        cameras: [],
        loadingCameras: false,
        oneCamera: null,
        loadingOneCamera: false,
        similarCameras: []
      }});

      const preparedComponent = withHistory(withStoreComponent);
      render(preparedComponent);
      const slides = screen.getAllByTestId(/slide/i);
      const slidesImg = screen.getAllByAltText(/баннер/i);

      expect(slides).toHaveLength(3);
      expect(slidesImg).toHaveLength(3);

    });

  });

});
