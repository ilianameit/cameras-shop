// import { fireEvent, render, screen } from '@testing-library/react';
// import ProductScreen from './product-screen';
// import { MemoryRouter, Route, Routes } from 'react-router-dom';
// import { MockStore, mockCamera, mockCameras, mockPromo } from '../../utils/mocks';
// import { withHistory, withStore } from '../../utils/mock-component';
// import { Provider } from 'react-redux';
// import { configureMockStore } from '@jedmao/redux-mock-store';
// import { createMemoryHistory } from 'history';
// import { NameSpace } from '../../const/const';


// describe('Component Product Screen', () => {


//   describe('should render correctly', () => {

//     it('should render add basket button', () => {
//       const initialState = MockStore({
//         CAMERA: {
//           oneCamera: mockCamera,
//         },

//       });

//       const { withStoreComponent } = withStore(<ProductScreen />, initialState);

//       const { getByTestId, getByText } = render(
//         <MemoryRouter>
//           {withStoreComponent}
//         </MemoryRouter>
//       );

//       // Находим кнопку "Добавить в корзину" по атрибуту data-testid
//       const addToCartButton = getByTestId('button-to-basket');

//       // Проверяем, что кнопка отображается на странице
//       expect(addToCartButton).toBeInTheDocument();

//       // Имитируем клик на кнопке "Добавить в корзину"
//       fireEvent.click(addToCartButton);

//       // Проверяем, что модальное окно "Добавить товар в корзину" отображается
//       const modalTitle = getByText('Добавить товар в корзину');
//       expect(modalTitle).toBeInTheDocument();
//     });

//   });

// });
