import { BrowserRouter } from 'react-router-dom';
import type { FC } from 'react';
import { QueryClientProvider } from './QueryClientProvider';
import { Router } from './RouterProvider';
import { Toaster } from 'react-hot-toast';

const Provider: FC = () => {
  return (
    <QueryClientProvider>
      <BrowserRouter>
        <Router />
        <Toaster
          position={'top-right'}
          toastOptions={{
            style: {
              background: '#000',
              color: '#FFF',
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
};
export default Provider;
