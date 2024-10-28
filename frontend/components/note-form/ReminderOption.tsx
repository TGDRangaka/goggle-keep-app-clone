import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const iconColor = '#5D5C62'

type Props = {
    icon: keyof typeof Ionicons.glyphMap,
    text: string,
    time?: string,
    onPress?: () => void,
}

export default function ReminderOption({ icon, text, time, onPress }: Props) {
    return (
        <TouchableOpacity onPress={onPress} className='flex-row p-2 items-center space-x-4'>
            <Ionicons name={icon} size={24} color={iconColor} />
            <Text className='flex-grow text-lg'>{text}</Text>
            {time && <Text className='text-lg'>{time}</Text>}
        </TouchableOpacity>
    )
}