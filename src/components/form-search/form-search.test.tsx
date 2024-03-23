import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { MockStore } from '../../utils/mocks';
import FormSearch from './form-search';

describe('Component FormSearch', () => {
  const mockStore = MockStore();

  describe('should render correctly', () => {

    const { withStoreComponent } = withStore(<FormSearch />, mockStore);

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    it('should render input search and button reset', () => {
      const inputElement = screen.getByTestId('search-input');
      expect(inputElement).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /сбросить поиск/i})).toBeInTheDocument();
    });

  });
});
