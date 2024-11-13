import React, { useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Modal, TouchableOpacity, View, Text, Pressable, Animated } from 'react-native';
import NoteForm from '@/components/note-form/NoteForm';
import { useDispatch, useSelector } from 'react-redux';
import { noteformActions } from '@/states/noteFormSlice';
import { RootState } from '@/states/store';
import NoteService from '@/services/noteService';
import { noteActions } from '@/states/noteSlice';
import { TNote } from '@/types/TNote';
import { setReminder } from '@/utils/reminders';

const iconsColor = '#444650';

export default function Footer() {
  const [modalVisible, setModalVisible] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [selectedType, setType] = useState<'text' | 'image' | 'drawing' | 'list'>('text');
  const { note, newImgs } = useSelector((root: RootState) => root.noteForm);
  const { user } = useSelector((root: RootState) => root.auth);

  // Animation values
  const rotateAni = useRef(new Animated.Value(0)).current;
  const optionAnimations = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  const dispatch = useDispatch();

  const handleViewForm = async (type: 'text' | 'image' | 'drawing' | 'list') => {
    setType(type);
    setModalVisible(true);
  };

  const pressOptionOpen = () => {
    if (!optionsOpen) setOptionsOpen(true);
    else {
      setTimeout(() => setOptionsOpen(false), 520);
    }

    // Rotate the main button
    Animated.timing(rotateAni, {
      toValue: optionsOpen ? 0 : 45,
      duration: 150,
      useNativeDriver: true,
    }).start();

    const aniOrder = optionsOpen ? optionAnimations.reverse() : optionAnimations;

    // Animate each option's opacity with a staggered delay
    aniOrder.forEach((animation, index) => {
      Animated.timing(animation, {
        toValue: optionsOpen ? 0 : 1, // Hide when closing, show when opening
        duration: 175,
        delay: index * 130, // Stagger effect
        useNativeDriver: true,
      }).start();
    });
  };

  const handleModalClose = async () => {
    pressOptionOpen();
    setModalVisible(false);
    if (!note.body && !note.title && note.imgs?.length == 0 && newImgs.length == 0 && note.list?.length == 0 && !note.reminder) {
      dispatch(noteformActions.clearNote());
      return;
    }
    const newNote: TNote = await NoteService.save(note, newImgs, user!);
    // console.log(newNote);
    dispatch(noteActions.addNote(newNote));
    dispatch(noteformActions.clearNote());
    setReminder(newNote);
  };

  return (
    <View className='items-end justify-end absolute bottom-5 right-5'>
      {optionsOpen && <View onTouchStart={pressOptionOpen} className='absolute w-screen h-[1000px] bg-black/20 -right-5 -bottom-5' />}
      {/* Options */}
      {optionsOpen && <View>
        <FooterOption animation={optionAnimations[3]} text='Image' icon='image-outline' onPress={() => handleViewForm('image')} />
        <FooterOption animation={optionAnimations[2]} text='Drawing' icon='brush' onPress={() => handleViewForm('drawing')} />
        <FooterOption animation={optionAnimations[1]} text='List' icon='checkmark-done' onPress={() => {
          dispatch(noteformActions.selectCheckboxes());
          handleViewForm('list');
        }} />
        <FooterOption animation={optionAnimations[0]} text='Text' icon='text' onPress={() => handleViewForm('text')} />
      </View>}

      {/* Main button */}
      <Pressable
        onPress={pressOptionOpen}
        className='flex-row items-center justify-center w-16 h-16 bg-[#435D9A] rounded-2xl'
      >
        <Animated.View
          style={{
            transform: [
              {
                rotate: rotateAni.interpolate({
                  inputRange: [0, 45],
                  outputRange: ['0deg', '45deg'],
                }),
              },
            ],
          }}
        >
          <Ionicons name="add" size={30} color="white" />
        </Animated.View>
      </Pressable>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <NoteForm closeModal={() => setModalVisible(false)} type={selectedType} />
      </Modal>
    </View>
  );
}



type OptionProps = {
  text: string;
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  animation: Animated.Value;
};

const FooterOption = ({ text, onPress, icon, animation }: OptionProps) => {
  return (
    <Animated.View
      style={{
        opacity: animation, // Only animate opacity for showing/hiding
      }}
      className='flex-row justify-end'
    >
      <Pressable
        onPress={onPress}
        className='p-4 rounded-3xl mb-1 flex-row items-center justify-end space-x-3 bg-blue-100'
      >
        <Text className='text-lg'>{text}</Text>
        <Ionicons name={icon} size={28} color={iconsColor} />
      </Pressable>
    </Animated.View>
  );
};
