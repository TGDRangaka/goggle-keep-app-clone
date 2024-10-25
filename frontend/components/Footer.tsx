import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Modal, TouchableOpacity, View } from 'react-native'
import { Image } from 'expo-image'
import NoteForm from '@/screens/NoteForm';
import { useDispatch, useSelector } from 'react-redux';
import { noteformActions } from '@/states/noteFormSlice';
import { RootState } from '@/states/store';
import NoteService from '@/services/noteService';

const iconsColor = '#444650'

export default function Footer() {
  const [modalVisible, setModalVisible] = useState(false);
  const { note } = useSelector((root: RootState) => root.noteForm);

  const dispatch = useDispatch();

  const handleViewForm = async () => {
    setModalVisible(true);
  }

  const handleModalClose = async () => {
    await NoteService.save(note);
    setModalVisible(false);
    dispatch(noteformActions.clearNote());
  }

  return (
    <View className='w-screen flex-row absolute left-0 bottom-0 bg-transparent'>
      {/* <ThemedText>Footer</ThemedText> */}
      <View className='bg-gray-300 flex-row py-4 space-x-6 px-8 flex-grow'>
        <TouchableOpacity
          onPress={handleViewForm}
        ><Ionicons name='checkbox-outline' color={iconsColor} size={28} /></TouchableOpacity>

        <TouchableOpacity
          onPress={handleViewForm}
        ><Ionicons name='brush-outline' color={iconsColor} size={28} /></TouchableOpacity>

        <TouchableOpacity
          onPress={handleViewForm}
        ><Ionicons name='mic-outline' color={iconsColor} size={28} /></TouchableOpacity>

        <TouchableOpacity
          onPress={handleViewForm}
        ><Ionicons name='image-outline' color={iconsColor} size={28} /></TouchableOpacity>
      </View>


      <View className='flex-col justify-end items-center h-full w-[68px]'>
        <TouchableOpacity
          onPress={handleViewForm}
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
        onRequestClose={handleModalClose}
      >
        <NoteForm />
      </Modal>
    </View>
  )
}