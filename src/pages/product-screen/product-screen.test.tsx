// import { render, screen } from '@testing-library/react';
// import ProductScreen from './product-screen';
// import { MemoryRouter,} from 'react-router-dom';
// import { MockStore, mockCamera, mockCameras, mockPromo } from '../../utils/mocks';
// import { withStore } from '../../utils/mock-component';
// import { NameSpace } from '../../const/const';


// describe('Component Product Screen', () => {


//   describe('should render correctly', () => {
//     it('should render add basket button', () => {
//       const addMock = jest.fn();
//       const initialState = MockStore({
//         [NameSpace.Camera]: {
//           promo: mockPromo,
//           cameras: mockCameras,
//           loadingCameras: false,
//           oneCamera: mockCamera,
//           loadingOneCamera: false,
//           similarCameras: mockCameras
//         }
//       });

//       const { withStoreComponent } = withStore(<ProductScreen add={addMock} />, initialState);

//       const route = '/product/1';

//       render(
//         <MemoryRouter initialEntries={[route]}>
//           {withStoreComponent}
//         </MemoryRouter>
//       );
//       expect(screen.getByTestId('button-to-basket')).toBeInTheDocument();
//     });

//   });

// });
