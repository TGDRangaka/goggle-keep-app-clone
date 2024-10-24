import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const iconColor = '#5D5C62'

export default function Header() {
    return (
        <View className='flex-row space-x-5 pt-4 px-4'>
            <TouchableOpacity><Ionicons name='arrow-back' size={30} color={iconColor} /></TouchableOpacity>
            <View className='flex-grow' />
            <TouchableOpacity><Ionicons name='pin-outline' size={30} color={iconColor} /></TouchableOpacity>
            <TouchableOpacity><Ionicons name='notifications-outline' size={30} color={iconColor} /></TouchableOpacity>
            <TouchableOpacity><Ionicons name='archive-outline' size={30} color={iconColor} /></TouchableOpacity>
        </View>
    )
}