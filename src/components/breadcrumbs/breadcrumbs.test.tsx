import { render, screen } from '@testing-library/react';
import Breadcrumbs from './breadcrumbs';
import { breadcrumbMain } from '../../const/const';

describe('Component Breadcrumbs', () => {

  describe('should render correctly', () => {

    it('should render breadcrumbs', () => {
      render(<Breadcrumbs breadcrumbs={[{title: breadcrumbMain.title}]} />);

      expect(screen.getByTestId(/breadcrumbs/i)).toBeInTheDocument();
      expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    });

  });

});
