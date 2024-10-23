import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'
import Checkbox from 'expo-checkbox'

export default function ListNote() {
    return (
        <TouchableOpacity>
            <ThemedView className='border border-gray-600 p-5 rounded-xl mb-2'>
                <ThemedText className='font-semibold mb-3'>sdf</ThemedText>

                <View className="flex-row items-center">
                    <Checkbox className="w-3 h-3 border mr-1" />
                    <ThemedText className="text-sm text-gray-300">Option 1</ThemedText>
                </View>
                <View className="flex-row items-center">
                    <Checkbox className="w-3 h-3 border mr-1" />
                    <ThemedText className="text-sm text-gray-300">Option 1</ThemedText>
                </View>
                <View className="flex-row items-center">
                    <Checkbox className="w-3 h-3 border mr-1" />
                    <ThemedText className="text-sm text-gray-300">Option 1</ThemedText>
                </View>

                <ThemedText className='text-xs text-gray-500 mt-3 ml-1 font-semibold'>
                    + 2 checked items
                </ThemedText>
            </ThemedView>
        </TouchableOpacity>

    )
}