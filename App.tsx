import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { AuthScreen } from './screens/authScreen';
import { useState } from 'react';

export default function App() {
  console.log("boom")
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [authDone, setAuth] = useState(false);
  const authProps = { setAuth };

  if (!isLoadingComplete) {
    return null;
  } else {
    if (authDone) {
      return (
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      );
    }
    else {
      return (
        <AuthScreen {...authProps}></AuthScreen>
      );
    }
  }
}
