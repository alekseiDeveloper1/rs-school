import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Page from './pages/StarWars/Page.tsx';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page />
  </StrictMode>
);
