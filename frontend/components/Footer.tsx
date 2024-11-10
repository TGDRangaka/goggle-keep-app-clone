import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Modal, TouchableOpacity, View } from 'react-native'
import { Image } from 'expo-image'
import NoteForm from '@/components/note-form/NoteForm';
import { useDispatch, useSelector } from 'react-redux';
import { noteformActions } from '@/states/noteFormSlice';
import { RootState } from '@/states/store';
import NoteService from '@/services/noteService';
import { noteActions } from '@/states/noteSlice';
import { TNote } from '@/types/TNote';
import { setReminder } from '@/utils/reminders';

const iconsColor = '#444650'

export default function Footer() {
  const [modalVisible, setModalVisible] = useState(false);
  const { note, newImgs } = useSelector((root: RootState) => root.noteForm);
  const { user } = useSelector((root: RootState) => root.auth);

  const dispatch = useDispatch();

  const handleViewForm = async () => {
    setModalVisible(true);
  }

  const handleModalClose = async () => {
    setModalVisible(false);
    const newNote: TNote = await NoteService.save(note, newImgs, user!);
    dispatch(noteActions.addNote(newNote));
    dispatch(noteformActions.clearNote());

    // Set a reminder notification if the new note has a reminder
    setReminder(newNote);
  };

  return (
    <View className='w-screen flex-row absolute left-0 bottom-0 bg-transparent'>
      {/* <ThemedText>Footer</ThemedText> */}
      <View className='bg-gray-200 flex-row py-4 space-x-6 px-8 flex-grow'>
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
          className='absolute -top-9  bg-gray-200 p-[6px] rounded-2xl'
        >
          <Ionicons name='add' color={'red'} size={40} />
        </TouchableOpacity>
        <Image source={require("@/assets/images/mask-path.svg")} className='w-full h-8' />
        <View className='bg-gray-200 w-full h-7'></View>
      </View>

      <View className='bg-gray-200 h-full w-10'></View>

      <Modal
        // className='absolute'
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <NoteForm closeModal={() => setModalVisible(false)} />
      </Modal>
    </View>
  )
}