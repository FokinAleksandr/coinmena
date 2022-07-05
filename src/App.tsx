import NetInfo from '@react-native-community/netinfo';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { onlineManager, QueryClient, QueryClientProvider } from 'react-query';

import { useReactQueryFocusManager } from '~/src/hooks/useReactQueryFocusManager';
import { ScreenResolver } from '~/src/navigation';

const queryClient = new QueryClient();

onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    if (state.type !== 'unknown') {
      setOnline(state.isConnected);
    }
  });
});

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
