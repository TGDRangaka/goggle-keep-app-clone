import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity, View } from 'react-native'
import { Image } from 'expo-image'

export default function Footer() {
  return (
    <View className='w-screen flex-row absolute left-0 bottom-0'>
      {/* <ThemedText>Footer</ThemedText> */}
      <View className='bg-gray-800 flex-row py-4 space-x-6 px-8 flex-grow'>
        <TouchableOpacity><Ionicons name='checkbox-outline' color={'white'} size={28} /></TouchableOpacity>
        <TouchableOpacity><Ionicons name='brush-outline' color={'white'} size={28} /></TouchableOpacity>
        <TouchableOpacity><Ionicons name='mic-outline' color={'white'} size={28} /></TouchableOpacity>
        <TouchableOpacity><Ionicons name='image-outline' color={'white'} size={28} /></TouchableOpacity>
      </View>


      <View className='flex-col justify-end items-center h-full w-[68px]'>
        <TouchableOpacity
          className='absolute -top-9  bg-gray-800 p-[6px] rounded-2xl'
        >
          <Ionicons name='add' color={'red'} size={40} />
        </TouchableOpacity>
        <Image source={require("@/assets/images/mask-path.svg")} className='w-full h-8' />
        <View className='bg-gray-800 w-full h-7'></View>
      </View>

      <View className='bg-gray-800 h-full w-10'></View>

    </View>
  )
}