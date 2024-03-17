import { render, screen } from '@testing-library/react';
import NotFoundScreen from './not-found-screen';
import { withHistory, withStore } from '../../utils/mock-component';
import { MockStore } from '../../utils/mocks';

describe('Component: NotFoundScreen', () => {
  const mockStore = MockStore();
  it('should render correctly', () => {
    const expectedHeaderText = '404';
    const expectedLinkText = 'Вернуться на главную';

    const { withStoreComponent } = withStore(<NotFoundScreen />, mockStore);
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
