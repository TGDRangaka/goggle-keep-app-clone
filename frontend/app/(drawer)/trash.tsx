import React from 'react'
import { ThemedText } from '@/components/ThemedText'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function page() {
  return (
    <SafeAreaView className='bg-white pt-2 px-3 flex-1 justify-center items-center'>
        <ThemedText>Trash</ThemedText>
    </SafeAreaView>
  )
}