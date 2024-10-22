import { View, Image as RImage, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'
import { Image as Img } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

export default function ImageNote() {
    const imageSource = require('@/assets/images/icon.png');
    const { width, height } = RImage.resolveAssetSource(imageSource);
    const aspectRatio = width / height; // Calculate the aspect ratio

    return (
        <ThemedView className='border border-gray-600 rounded-xl mb-2 overflow-hidden'>
            <View style={{ width: '100%', aspectRatio }}>
                {/* Image */}
                <Img
                    source={imageSource}
                    className="mb-3 h-full"
                />
                <LinearGradient
                    colors={['transparent', 'rgba(0, 0, 0, 0.4)']}
                    className='w-full h-full absolute'
                >
                    <TouchableOpacity className='absolute right-1 bottom-1'>
                        <Ionicons name='sync' color='white' size={20} />
                    </TouchableOpacity>
                </LinearGradient>
            </View>

            <ThemedText className='font-semibold my-3 mx-5'>Wow</ThemedText>
            <ThemedText className='text-sm mb-3 mx-5'>Wow</ThemedText>
        </ThemedView>
    );
}