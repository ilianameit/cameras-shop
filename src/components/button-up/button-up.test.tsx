import { render, screen } from '@testing-library/react';
import ButtonUp from './button-up';

describe('Component ButtonScrollUp', () => {

  describe('should render correctly', () => {

    it('should render button scroll up', () => {
      render(<ButtonUp />);

      expect(screen.getByTestId(/scroll up/i)).toBeInTheDocument();
    });

  });

});
