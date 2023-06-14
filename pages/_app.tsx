import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UnauthorizedContext } from '@/components/Unauthorized';

import type { AppProps } from 'next/app';

import '@/styles/globals.css';

export const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [unauthorizedVisibility, setUnauthorizedVisibility] = useState(false);
  const showUnauthorized = () => setUnauthorizedVisibility(true);
  const hideUnauthorized = () => setUnauthorizedVisibility(false);

  return (
    <QueryClientProvider client={queryClient}>
      <UnauthorizedContext.Provider
        value={{
          isVisible: unauthorizedVisibility,
          show: showUnauthorized,
          hide: hideUnauthorized,
        }}
      >
        <Component {...pageProps} />
      </UnauthorizedContext.Provider>
    </QueryClientProvider>
  );
}
