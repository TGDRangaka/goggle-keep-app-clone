import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import { ThemedView } from '@/components/ThemedView';

export default function Index() {
    const [isAuthenticated, setAuthenticated] = useState(true);
    const [loading, setLoading] = useState(true);
    // const [isAuthenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    const handlRoute = () => {
        router.push(isAuthenticated ? '/(drawer)' : '/(auth)');
    }

    const load = async () => {
        await new Promise((resolve) => setTimeout(resolve,2000));
        setLoading(false);
        if (isAuthenticated) {
            router.push('/(drawer)')
        } else {
            router.push('/(auth)')
        }
    }

    useEffect(() => {
        load();
    },[])

    return loading
        ? (
            <ThemedView className='flex-1 justify-center items-center'>
                <Text>Loading...</Text>
            </ThemedView>
        )
        : (
            <View className='flex-1 justify-center items-center'>
                <Text>Indexxxxxx</Text>
                <TouchableOpacity onPress={handlRoute}><Text>sdf</Text></TouchableOpacity>
            </View>
        )
}