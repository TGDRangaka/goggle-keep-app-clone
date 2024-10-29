import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import ModalView from '../ModalView'
import { ThemedView } from '../ThemedView'
import ReminderOption from './ReminderOption'
import { useDispatch } from 'react-redux'
import { noteformActions } from '@/states/noteFormSlice'
import { ERepeat } from '@/types/TNote'

const iconColor = '#5D5C62'

export default function Header(props: any) {
    const [reminderModal, setReminderModal] = useState(false);
    const dispatch = useDispatch();

    const handleBack = () => {
        props.closeModal();
    }

    const handleReminderEdit = () => {
        setReminderModal(false);
        dispatch(noteformActions.setReminderModalVisible(true));
    }

    const setQuickReminder = (date: Date) => {
        dispatch(noteformActions.updateReminder({
            datetime: date.toISOString(),
            repeat: ERepeat.DOES_NOT_REPEAT,
        }))
        setReminderModal(false)
    }

    return (
        <View className='flex-row space-x-5 pt-4 px-4'>
            <TouchableOpacity onPress={handleBack}><Ionicons name='arrow-back' size={30} color={iconColor} /></TouchableOpacity>
            <View className='flex-grow' />
            <TouchableOpacity><Ionicons name='pin-outline' size={30} color={iconColor} /></TouchableOpacity>
            <TouchableOpacity onPress={() => setReminderModal(true)}><Ionicons name='notifications-outline' size={30} color={iconColor} /></TouchableOpacity>
            <TouchableOpacity><Ionicons name='archive-outline' size={30} color={iconColor} /></TouchableOpacity>


            <ModalView visible={reminderModal} setVisible={setReminderModal} onClose={() => setReminderModal(false)}>
                <ThemedView className='bg-gray-200 pb-2'>
                    <View className='border-b mx-3 border-gray-400 pb-3'>
                        <Text className='text-lg py-1'>Remind me later</Text>
                        <Text className='text-xs '>Saved in Google Reminders</Text>
                    </View>

                    {/* Later today at 18:00 */}
                    <ReminderOption
                        icon='time-outline'
                        text='Later today'
                        time='18:00'
                        onPress={() => {
                            const now = new Date();
                            const laterToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0);
                            setQuickReminder(laterToday);
                        }}
                    />

                    {/* Tomorrow morning at 08:00 */}
                    <ReminderOption
                        icon='time-outline'
                        text='Tomorrow morning'
                        time='08:00'
                        onPress={() => {
                            const now = new Date();
                            const tomorrowMorning = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 8, 0);
                            setQuickReminder(tomorrowMorning);
                        }}
                    />

                    {/* Tomorrow night at 20:00 */}
                    <ReminderOption
                        icon='time-outline'
                        text='Tomorrow night'
                        time='20:00'
                        onPress={() => {
                            const now = new Date();
                            const tomorrowNight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 20, 0);
                            setQuickReminder(tomorrowNight);
                        }}
                    />

                    <ReminderOption icon='home' text='Home' />
                    <ReminderOption icon='bag' text='Work' />

                    {/* Pick a date & time */}
                    <ReminderOption onPress={handleReminderEdit} icon='time-outline' text='Pick a date & time' />

                    <ReminderOption icon='location-outline' text='Pick a place' />
                </ThemedView>
            </ModalView>

        </View>

    )
}