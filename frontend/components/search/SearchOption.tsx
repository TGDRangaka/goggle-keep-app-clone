import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

type Props = {
    icon: keyof typeof Ionicons.glyphMap,
    text: string,
    onPress?: () => void,
}

export default function SearchOption({ icon, text, onPress }: Props) {
    return (
        <TouchableOpacity onPress={onPress} className='items-center space-y-2'>
            <View className='w-24 aspect-square bg-blue-200/90 rounded-full justify-center items-center'>
                <Ionicons name={icon} size={40} />
            </View>
            <Text className='font-light'>{text}</Text>
        </TouchableOpacity>
    )
}