import { render, screen } from '@testing-library/react';
import { MockStore, mockCamera } from '../../../utils/mocks';
import ReviewPopup from './review-popup';
import { withHistory, withStore } from '../../../utils/mock-component';
import userEvent from '@testing-library/user-event';
import { APIRoute, NameSpace } from '../../../const/const';

describe('Component ReviewModal', () => {

  const mockStore = MockStore();
  function onClose() {
    jest.fn();
  }

  describe('should render correctly', () => {

    it('should render correctly inputs and submit button', () => {
      const { withStoreComponent } = withStore(<ReviewPopup onClose={onClose} idCamera={mockCamera.id}/>, mockStore);

      const preparedComponent = withHistory(withStoreComponent);

      render(preparedComponent);

      expect(screen.getByLabelText('Ваше имя', { selector: 'input' })).toBeInTheDocument();
      expect(screen.getByLabelText('Достоинства', { selector: 'input' })).toBeInTheDocument();
      expect(screen.getByLabelText('Недостатки', { selector: 'input' })).toBeInTheDocument();
      expect(screen.getByLabelText('Комментарий', { selector: 'textarea' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /отправить отзыв/i })).toBeInTheDocument();
    });

  });

  describe('should render correctly when user enter', () => {

    beforeEach(() => {
      const { withStoreComponent } = withStore(<ReviewPopup onClose={onClose} idCamera={mockCamera.id}/>, mockStore);

      const preparedComponent = withHistory(withStoreComponent);

      render(preparedComponent);
    });

    it('should render correctly when user enter name', async () => {
      const expectedReviewValue = 'Иван';

      await userEvent.type(
        screen.getByLabelText('Ваше имя', { selector: 'input' }),
        expectedReviewValue,
      );

      expect(screen.getByDisplayValue(expectedReviewValue)).toBeInTheDocument();
    });

    it('should render correctly when user enter advantage', async () => {
      const expectedReviewValue = 'Качество';

      await userEvent.type(
        screen.getByLabelText('Достоинства', { selector: 'input' }),
        expectedReviewValue,
      );

      expect(screen.getByDisplayValue(expectedReviewValue)).toBeInTheDocument();
    });

    it('should render correctly when user enter disadvantage', async () => {
      const expectedReviewValue = 'Размер';

      await userEvent.type(
        screen.getByLabelText('Недостатки', { selector: 'input' }),
        expectedReviewValue,
      );

      expect(screen.getByDisplayValue(expectedReviewValue)).toBeInTheDocument();
    });

    it('should render correctly when user enter review', async () => {
      const expectedReviewValue = 'Размер';

      await userEvent.type(
        screen.getByLabelText('Комментарий', { selector: 'textarea' }),
        expectedReviewValue,
      );

      expect(screen.getByDisplayValue(expectedReviewValue)).toBeInTheDocument();
    });

  });

  describe('should dispatch send action when user clicked send button', () => {

    it('should render thanks modal after send review', () => {
      const { withStoreComponent, mockAxiosAdapter } = withStore(<ReviewPopup onClose={onClose} idCamera={mockCamera.id}/>, {
        [NameSpace.Review]: {
          reviews: [],
          isLoadingReview: false,
          isAddReviewSuccess: true,
        }
      });

      mockAxiosAdapter.onPost(APIRoute.Reviews).reply(200, {});

      const preparedComponent = withHistory(withStoreComponent);

      render(preparedComponent);

      expect(screen.getByRole('button', { name: /вернуться к покупкам/i })).toBeInTheDocument();
    });

  });

});
