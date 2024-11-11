import { TouchableOpacity } from 'react-native'
import React from 'react'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { useSelector } from 'react-redux'
import { RootState } from '@/states/store'

export default function Header() {
  const { photoUrl } = useSelector((root: RootState) => root.auth.user!);
  const navigation = useNavigation();
  const router = useRouter();

  const handleMenuClick = () => {
    navigation.toggleDrawer();
  }

  const handleSearchPress = () => {
    router.push('/search')
  }

  return (
    <ThemedView className='bg-gray-100 w-full py-2 px-5 mb-5 rounded-full flex-row items-center space-x-3'>
      <TouchableOpacity onPress={handleMenuClick}>
        <Ionicons name='menu' size={30} color='#b9b9c4' />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSearchPress} className='flex-grow'>
        <ThemedText>Search your notes</ThemedText>
      </TouchableOpacity>

      {/* <Ionicons name='barcode-outline' size={25} color='#b9b9c4'/> */}
      <Ionicons name='grid-outline' size={25} color='#b9b9c4' />
      <ThemedView className='w-8 aspect-square bg-transparent rounded-full -mr-2'>
        <Image source={{ uri: photoUrl ? photoUrl : ''}} contentFit="cover" className='w-8 aspect-square rounded-full' />
      </ThemedView>
    </ThemedView>
  )
}