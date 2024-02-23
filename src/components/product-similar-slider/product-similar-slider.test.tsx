import { render, screen } from '@testing-library/react';
import ProductSimilarSlider from './product-similar-slider';
import { MockStore, mockCamera } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';


describe('Component Similar Cameras Slider', () => {
  function onBuyClick() {
    jest.fn();
  }

  describe('should render correctly', () => {

    it('should render title related', () => {
      const mockStore = MockStore();

      const { withStoreComponent } = withStore(<ProductSimilarSlider onBuyClick={onBuyClick} similarCameras={[mockCamera]}/>, mockStore);

      const preparedComponent = withHistory(withStoreComponent);

      render(preparedComponent);

      expect(screen.getByText('Похожие товары')).toBeInTheDocument();
    });

  });

});
