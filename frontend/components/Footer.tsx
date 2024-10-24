import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Modal, TouchableOpacity, View } from 'react-native'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router';
import NoteForm from '@/screens/NoteForm';

const iconsColor = '#444650'

export default function Footer() {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  return (
    <View className='w-screen flex-row absolute left-0 bottom-0 bg-transparent'>
      {/* <ThemedText>Footer</ThemedText> */}
      <View className='bg-gray-300 flex-row py-4 space-x-6 px-8 flex-grow'>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
        ><Ionicons name='checkbox-outline' color={iconsColor} size={28} /></TouchableOpacity>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
        ><Ionicons name='brush-outline' color={iconsColor} size={28} /></TouchableOpacity>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
        ><Ionicons name='mic-outline' color={iconsColor} size={28} /></TouchableOpacity>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
        ><Ionicons name='image-outline' color={iconsColor} size={28} /></TouchableOpacity>
      </View>


      <View className='flex-col justify-end items-center h-full w-[68px]'>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className='absolute -top-9  bg-gray-300 p-[6px] rounded-2xl'
        >
          <Ionicons name='add' color={'red'} size={40} />
        </TouchableOpacity>
        <Image source={require("@/assets/images/mask-path.svg")} className='w-full h-8' />
        <View className='bg-gray-300 w-full h-7'></View>
      </View>

      <View className='bg-gray-300 h-full w-10'></View>
      <Modal
        // className='absolute'
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <NoteForm />
      </Modal>
    </View>
  )
}