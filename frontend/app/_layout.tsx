import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, Text, View } from 'react-native';
import { DrawerItemList } from '@react-navigation/drawer';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function Layout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          drawerContent={
            (props) => {
              return (
                <SafeAreaView>
                  <ThemedView className='mt-16 mb-4 px-8'>
                    <ThemedText className='text-3xl font-semibold'>Goggle Keep</ThemedText>
                  </ThemedView>
                  <DrawerItemList {...props} />
                </SafeAreaView>

              );
            }
          }
          screenOptions={{
            headerShown: false,   // add a custom header instead
          }}
        >
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: 'Notes',
              drawerIcon: ({ color }) => (
                <Ionicons name="bulb-outline" size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="reminders"
            options={{
              drawerLabel: 'Reminders',
              drawerIcon: ({ color }) => (
                <Ionicons name="notifications-outline" size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="createLabel"
            options={{
              drawerLabel: 'Create New Label',
              drawerIcon: ({ color }) => (
                <Ionicons name="add" size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="archive"
            options={{
              drawerLabel: 'Archive',
              drawerIcon: ({ color }) => (
                <Ionicons name="add" size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="trash"
            options={{
              drawerLabel: 'Trash',
              drawerIcon: ({ color }) => (
                <Ionicons name="add" size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="settings"
            options={{
              drawerLabel: 'Settings',
              drawerIcon: ({ color }) => (
                <Ionicons name="add" size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="helpFeedback"
            options={{
              drawerLabel: 'Help & Feedback',
              drawerIcon: ({ color }) => (
                <Ionicons name="add" size={24} color={color} />
              ),
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </ThemeProvider>

  );
}
