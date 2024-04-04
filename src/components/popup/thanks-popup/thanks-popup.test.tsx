import { render, screen } from '@testing-library/react';
import { withHistory } from '../../../utils/mock-component';
import ThanksPopup from './thanks-popup';


describe('Component Thanks modal', () => {
  describe('should render correctly', () => {
    const focusElement = { current: document.createElement('button') };
    it('should render', () => {
      const preparedComponent = withHistory(<ThanksPopup focusElement={focusElement}/>);

      render(preparedComponent);
      expect(screen.getByRole('button', { name: /Вернуться к покупкам/i})).toBeInTheDocument();

    });

    it('should render without header when create order error', () => {
      const preparedComponent = withHistory(<ThanksPopup focusElement={focusElement} isErrorCreateOrder/>);

      render(preparedComponent);
      expect(screen.getByRole('button', { name: /Вернуться к покупкам/i})).toBeInTheDocument();
      expect(screen.queryByRole('svg')).toBeNull();

    });

  });

});
