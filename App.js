import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import Root from './navigation/Root';
import { ThemeProvider } from 'styled-components/native';
import { darkTheme, lightTheme } from './styled';
import { QueryClient, QueryClientProvider } from 'react-query';

// const loadFonts = fonts => fonts.map(font => Font.loadAsync(font));
const queryClient = new QueryClient();

export default function App() {
  const [ready, setReady] = useState(false);
  const startLoading = async () => {
    await Font.loadAsync(Ionicons.font);
  };
  const onFinish = () => setReady(true);
  const isDark = useColorScheme() === 'dark';
  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          {/*<Tabs />*/}
          {/*<Stack />*/}
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
