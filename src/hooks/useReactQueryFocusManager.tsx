import { AppState } from 'react-native';
import { focusManager } from 'react-query';

export function useReactQueryFocusManager() {
  focusManager.setEventListener(handleFocus => {
    const subscription = AppState.addEventListener('change', state => {
      handleFocus(state === 'active');
    });

    return () => {
      subscription.remove();
    };
  });
}
