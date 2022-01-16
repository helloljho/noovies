import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Text, useColorScheme, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import Root from './navigation/Root';
import { ThemeProvider } from 'styled-components/native';
import { darkTheme, lightTheme } from './styled';

const loadFonts = fonts => fonts.map(font => Font.loadAsync(font));

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
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer>
        {/*<Tabs />*/}
        {/*<Stack />*/}
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
