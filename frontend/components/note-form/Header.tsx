import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import ModalView from '../ModalView'
import { ThemedView } from '../ThemedView'
import ReminderOption from './ReminderOption'

const iconColor = '#5D5C62'

export default function Header(props: any) {
    const [reminderModal, setReminderModal] = useState(false);

    const handleBack = () => {
        props.closeModal();
    }

    return (
        <View className='flex-row space-x-5 pt-4 px-4'>
            <TouchableOpacity onPress={handleBack}><Ionicons name='arrow-back' size={30} color={iconColor} /></TouchableOpacity>
            <View className='flex-grow' />
            <TouchableOpacity><Ionicons name='pin-outline' size={30} color={iconColor} /></TouchableOpacity>
            <TouchableOpacity onPress={() => setReminderModal(true)}><Ionicons name='notifications-outline' size={30} color={iconColor} /></TouchableOpacity>
            <TouchableOpacity><Ionicons name='archive-outline' size={30} color={iconColor} /></TouchableOpacity>


            <ModalView visible={reminderModal} setVisible={setReminderModal} onClose={() => setReminderModal(false)}>
                <ThemedView className=' bg-gray-200 pb-2'>
                    <View className='border-b mx-3 border-gray-400 pb-3'>
                        <Text className='text-lg py-1'>Remind me later</Text>
                        <Text className='text-xs '>Saved in Google Reminders</Text>
                    </View>
                    <ReminderOption icon='time-outline' text='Later today' time='18:00' />
                    <ReminderOption icon='time-outline' text='Tomorrow morning' time='08:00' />
                    <ReminderOption icon='time-outline' text='Monday morning' time=' Mon 08:00' />
                    <ReminderOption icon='home' text='Home' />
                    <ReminderOption icon='bag' text='Work' />
                    <ReminderOption icon='time-outline' text='Pick a date & time' />
                    <ReminderOption icon='location-outline' text='Pick a place' />
                </ThemedView>
            </ModalView>
        </View>

    )
}