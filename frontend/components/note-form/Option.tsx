import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ThemedText } from '../ThemedText'
import { Ionicons } from '@expo/vector-icons'

type Props = {
    icon: keyof typeof Ionicons.glyphMap,
    text: string,
    onPress?: () => void
}

export default function Option({ icon, text, onPress }: Props) {
    return (
        <TouchableOpacity onPress={onPress} className='flex-row items-center space-x-3 my-3'>
            <Ionicons name={icon} size={27} color={"#1f2937"} />
            <ThemedText className='text-lg'>{text}</ThemedText>
        </TouchableOpacity>
    )
}