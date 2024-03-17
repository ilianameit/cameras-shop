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
    it('should render button reset', () => {
      expect(screen.getByRole('button', { name: /сбросить поиск/i})).toBeInTheDocument();
    });

    it('should render input search with placeholder', ()=> {
      expect(screen.getByPlaceholderText(/Поиск по сайту/i)).toBeInTheDocument();
    });

  });
});
