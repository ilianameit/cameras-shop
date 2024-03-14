import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { fetchCamerasAction } from './store/api-actions';
import { ToastContainer } from 'react-toastify';

store.dispatch(fetchCamerasAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ToastContainer
        position="top-center"
        closeOnClick
      />
      <App />
    </React.StrictMode>
  </Provider>
);
