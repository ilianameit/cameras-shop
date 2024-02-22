import { render, screen } from '@testing-library/react';
import { withHistory } from '../../../utils/mock-component';
import ThanksPopup from './thanks-popup';


describe('Component Thanks modal', () => {
  describe('should render correctly', () => {
    it('should render', () => {
      const preparedComponent = withHistory(<ThanksPopup/>);

      render(preparedComponent);
      expect(screen.getByRole('button', { name: /Вернуться к покупкам/i})).toBeInTheDocument();

    });

  });

});
