import { View, Text } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router'

export default function Layout() {
    return (
        <GestureHandlerRootView className='flex flex-1'>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="index" />
            </Stack>
        </GestureHandlerRootView>
    )
}