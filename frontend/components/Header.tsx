import { TouchableOpacity } from 'react-native'
import React from 'react'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'expo-image'

export default function Header() {
  const navigation = useNavigation();

  const handleMenuClick = () => {
    navigation.toggleDrawer();
  }

  return (
    <ThemedView className='bg-gray-100 w-full py-2 px-5 mb-5 rounded-full flex-row items-center space-x-3'>
      <TouchableOpacity onPress={handleMenuClick}>
        <Ionicons name='menu' size={30} color='#b9b9c4' />
      </TouchableOpacity>
      <ThemedText className='flex-grow'>Search your notes</ThemedText>

      {/* <Ionicons name='barcode-outline' size={25} color='#b9b9c4'/> */}
      <Ionicons name='grid-outline' size={25} color='#b9b9c4' />
      <ThemedView className='w-8 aspect-square bg-transparent rounded-full -mr-2'>
        <Image source={require('@/assets/images/icon.png')} contentFit="cover" className='w-8 aspect-square rounded-full' />
      </ThemedView>
    </ThemedView>
  )
}