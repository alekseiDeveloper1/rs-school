import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Page from './pages/StarWars/Page';
import About from './pages/About/Page';
import NotFoundPage from './pages/NotFound/Page';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Page />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/about',
    element: <About />,
  },
]);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
