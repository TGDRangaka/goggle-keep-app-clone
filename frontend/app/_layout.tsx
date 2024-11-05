import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, Text, View } from 'react-native';
import { DrawerItemList } from '@react-navigation/drawer';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider } from 'react-redux';
import { makeStore } from '@/states/store';
import { Stack } from 'expo-router';
import { useState } from 'react';

export default function Layout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={makeStore()}>
      <GestureHandlerRootView className='flex flex-1'>
        <Stack
        screenOptions={{
          headerShown: false,
        }}
        >
          <Stack.Screen name='index' />
        </Stack>
      </GestureHandlerRootView>
    </Provider>
  );
}
