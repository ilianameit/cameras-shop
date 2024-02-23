// import { render, screen } from '@testing-library/react';
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

//       const mockHistory = createMemoryHistory();
//       mockHistory.push('/product/1'); //будто не сработал маршрут

//       const componentWithHistory = withHistory(
//         <ProductScreen />,
//         mockHistory
//       );

//       const { withStoreComponent } = withStore(componentWithHistory, {[NameSpace.Camera]: {
//         promo: mockPromo,
//         cameras: mockCameras,
//         loadingCameras: false,
//         oneCamera: mockCamera,
//         loadingOneCamera: false,
//         similarCameras: mockCameras
//       }});

//       render(withStoreComponent);

//       expect(screen.getByRole('button', { name: /добавить в корзину/i })).toBeInTheDocument();
//     });

//   });

// });

