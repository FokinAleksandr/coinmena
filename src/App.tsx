import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';

import { useReactQueryFocusManager } from '~/src/hooks/useReactQueryFocusManager';
import { ScreenResolver } from '~/src/navigation';

const queryClient = new QueryClient();

export function App() {
  useReactQueryFocusManager();

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ScreenResolver />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
