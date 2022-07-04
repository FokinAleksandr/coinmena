import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ScreenResolver } from '~/src/navigation';

const queryClient = new QueryClient();

export function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ScreenResolver />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
