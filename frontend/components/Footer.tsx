import React from 'react'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'

export default function Footer() {
  return (
    <ThemedView className='w-screen h-12 bg-gray-800 absolute left-0 bottom-0'>
        {/* <ThemedText>Footer</ThemedText> */}
    </ThemedView>
  )
}