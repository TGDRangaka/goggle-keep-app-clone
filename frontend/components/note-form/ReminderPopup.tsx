import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/states/store'
import { noteformActions } from '@/states/noteFormSlice';
import { Ionicons } from '@expo/vector-icons';
import { getFormattedDate, getFormattedTime } from '@/utils/utilMaters';

export default function ReminderPopup() {
  const { reminderEditModal, note } = useSelector((root: RootState) => root.noteForm);
  const { reminder } = note;
  const [selectDate, setSelectDate] = useState(false);
  const [selectTime, setSelectTime] = useState(false);
  const [selectRepeat, setSelectRepeat] = useState(false);
  // Initialize DateTime
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [repeat, setRepeat] = useState('Does not repeat');

  const dispatch = useDispatch();

  useEffect(() => {
    if(reminder){
      setSelectedDateTime(new Date(reminder.datetime));
      setRepeat(reminder.repeat);
    }
  },[reminder])

  const closeModal = () => {
    if (selectDate || selectTime || selectRepeat) {
      closeSelects();
      return;
    }
    dispatch(noteformActions.setReminderModalVisible(false));
  };

  const closeSelects = () => {
    setSelectDate(false);
    setSelectTime(false);
    setSelectRepeat(false);
  };

  const saveReminder = () => {
    dispatch(noteformActions.updateReminder({
      datetime: selectedDateTime.toISOString(),
      repeat: repeat
    }));
    closeSelects();
    closeModal();
  }

  const deleteReminder = () => {
    dispatch(noteformActions.updateReminder(null));
    closeSelects();
    closeModal();
  }

  // Update date part of selectedDateTime
  const handleDateChange = (dateValue: string) => {
    const newDate = new Date(selectedDateTime);
    switch (dateValue) {
      case 'Today': newDate.setDate(new Date().getDate()); break;
      case 'Tomorrow': newDate.setDate(new Date().getDate() + 1); break;
      case 'Next Monday': newDate.setDate(newDate.getDate() + ((1 + 7 - newDate.getDay()) % 7 || 7)); break;
      default: // Custom date picker logic can go here
    }
    setSelectedDateTime(newDate);
    setSelectDate(false);
  };

  // Update time part of selectedDateTime
  const handleTimeChange = (timeValue: string) => {
    const newDate = new Date(selectedDateTime);
    switch (timeValue) {
      case '08:00': newDate.setHours(8, 0);  break;
      case '13:00': newDate.setHours(13, 0); break;
      case '18:00': newDate.setHours(18, 0); break;
      case '20:00': newDate.setHours(20, 0); break;
      default: // Custom time picker logic can go here 
    }
    setSelectedDateTime(newDate);
    setSelectTime(false);
  };

  return (
    <Modal
      visible={reminderEditModal}
      transparent={true}
      onRequestClose={closeModal}
      animationType='fade'
    >
      <View className='flex-1 items-center justify-center px-8 bg-black/20'>
        <TouchableOpacity className='w-screen h-screen absolute left-0 top-2' onPress={closeModal} />
        <View className='w-full bg-white rounded-[30px]'>
          <Text className='text-xl text-black/80 px-5 py-3'>{reminder ? 'Edit' : 'Add'} reminder</Text>

          <View className='flex-row px-[1px] space-x-[2px] border-b border-gray-300'>
            <Text className='flex-grow text-center py-3 border-b-2 border-blue-900 text-blue-900'>Time</Text>
            <Text className='flex-grow text-center py-3'>Place</Text>
          </View>

          <View className='px-5 py-3 space-y-3'>
            {/* Date Selector */}
            <TouchableOpacity className='flex-row border-b border-gray-300 items-center py-2' onPress={() => { closeSelects(); setSelectDate(!selectDate); }}>
              <Text className='flex-grow'>{getFormattedDate(selectedDateTime)}</Text>
              <Ionicons name='caret-down' size={15} />
            </TouchableOpacity>
            {selectDate && (
              <View className='absolute bg-white rounded-md w-64 -top-2 py-1 m-5 shadow-lg shadow-black' style={{ zIndex: 10 }}>
                <DateOption text='Today' onPress={handleDateChange} />
                <DateOption text='Tomorrow' onPress={handleDateChange} />
                <DateOption text='Next Monday' onPress={handleDateChange} />
                <DateOption text='Pick a date' onPress={handleDateChange} />
              </View>
            )}

            {/* Time Selector */}
            <TouchableOpacity className='flex-row border-b border-gray-300 items-center py-2' onPress={() => { closeSelects(); setSelectTime(!selectTime); }}>
              <Text className='flex-grow'>{getFormattedTime(selectedDateTime)}</Text>
              <Ionicons name='caret-down' size={15} />
            </TouchableOpacity>
            {selectTime && <View className='absolute bg-white rounded-md w-64 top-10 space-y-3 px-1 py-3 m-5 shadow-lg shadow-black' style={{ zIndex: 10 }}>
              <TimeOption text='Morning' time='08:00' onPress={handleTimeChange} />
              <TimeOption text='Afternoon' time='13:00' onPress={handleTimeChange} />
              <TimeOption text='Evening' time='18:00' onPress={handleTimeChange} />
              <TimeOption text='Night' time='20:00' onPress={handleTimeChange} />
              <TimeOption text='Pick a time' time='' onPress={handleTimeChange} />
            </View>}

            {/* Repeat Selector */}
            <TouchableOpacity className='flex-row border-b border-gray-300 items-center py-2' onPress={() => { closeSelects(); setSelectRepeat(!selectRepeat); }}>
              <Text className='flex-grow'>{repeat}</Text>
              <Ionicons name='caret-down' size={15} />
            </TouchableOpacity>
            {selectRepeat && (
              <View className='absolute bg-white rounded-md w-64 top-[86px] space-y-3 px-1 py-3 m-5 shadow-lg shadow-black' style={{ zIndex: 10 }}>
                <RepeatOption text='Does not repeat' onPress={setRepeat} closeSelects={closeSelects} />
                <RepeatOption text='Daily' onPress={setRepeat} closeSelects={closeSelects} />
                <RepeatOption text='Weekly' onPress={setRepeat} closeSelects={closeSelects} />
                <RepeatOption text='Monthly' onPress={setRepeat} closeSelects={closeSelects} />
                <RepeatOption text='Yearly' onPress={setRepeat} closeSelects={closeSelects} />
              </View>
            )}

            {/* Actions */}
            <View className='flex-row justify-end space-x-5 items-center'>
              {reminder && <TouchableOpacity onPress={deleteReminder}><Text className='text-sm text-blue-900'>Delete</Text></TouchableOpacity>}
              <TouchableOpacity onPress={closeModal}><Text className='text-sm text-blue-900'>Cancel</Text></TouchableOpacity>
              <TouchableOpacity onPress={saveReminder}><Text className='text-sm text-white bg-blue-900 px-4 py-2 rounded-3xl'>Save</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const DateOption = ({ text, onPress }: any) => {
  return <Text className='border-b border-gray-300 px-1 pt-5 pb-2' onPress={() => onPress(text)}>{text}</Text>
}

const TimeOption = ({ text, time, onPress }: any) => {
  return (
    <TouchableOpacity onPress={() => onPress(time)} className='flex-row border-b border-gray-300 px-1 pt-5 pb-2'>
      <Text className='flex-grow'>{text}</Text>
      <Text>{time}</Text>
    </TouchableOpacity>
  )
}

const RepeatOption = ({ text, onPress, closeSelects }: any) => {
  return <Text
    className='border-b border-gray-300 px-1 pt-5 pb-2'
    onPress={() => { onPress(text); closeSelects(); }}
  >
    {text}
  </Text>
}