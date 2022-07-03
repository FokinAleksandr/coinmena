import * as React from 'react';
import { Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Screen />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

function Screen() {
  return (
    <SafeAreaView>
      <Text>123</Text>
    </SafeAreaView>
  );
}
