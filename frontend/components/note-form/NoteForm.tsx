import { View, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { Ionicons } from '@expo/vector-icons'
import { ThemedText } from '@/components/ThemedText'
import { ERepeat, TNote } from '@/types/TNote'
import Header from '@/components/note-form/Header'
import Images from '@/components/note-form/Images'
import List from '@/components/note-form/List'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/states/store'
import { noteformActions } from '@/states/noteFormSlice'
import ToolBar from '@/components/note-form/ToolBar'
import ReminderPopup from './ReminderPopup'
import { getFormattedDate, getFormattedTime } from '@/utils/utilMaters'

const iconColor = '#5D5C62'
type Props = {
    data?: TNote;
    closeModal: () => void;
}

export default function NoteForm({ data, closeModal }: Props) {
    const { isNote } = useSelector((root: RootState) => root.noteForm);
    const { title, body, imgs, list, reminder, color } = useSelector((root: RootState) => root.noteForm.note);

    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            delete data.createdDate;
            dispatch(noteformActions.setNote(data));
        }
    }, [])

    return (
        <ThemedView className='flex-1 w-full' style={color ? { backgroundColor: color } : null}>
            {/* Header */}
            <Header closeModal={closeModal} />

            <ScrollView className='mb-12'>
                {/* images */}
                <View className='flex-row w-full mt-5'>
                    {
                        imgs && imgs.length > 0 && <Images />
                    }
                </View>

                <View className='px-4'>
                    {/* Title */}
                    <TextInput
                        className='w-screen mt-5 text-2xl text-gray-800'
                        placeholderTextColor='#99989E'
                        placeholder='Title'
                        multiline={true}
                        value={title}
                        onChangeText={t => dispatch(noteformActions.updateTitle(t))}
                    />

                    {/* Note */}
                    {
                        isNote && <TextInput
                            className='w-screen mt-5 text-lg text-gray-800'
                            placeholderTextColor='#C4C3C9'
                            placeholder='Note'
                            multiline={true}
                            value={body}
                            onChangeText={t => dispatch(noteformActions.updateBody(t))}
                        />
                    }

                    {/* checkboxes */}
                    {
                        !isNote && <List />
                    }

                    {/* reminder */}
                    {
                        reminder &&
                        <View className='flex-row w-full ml-[45px] mt-5'>
                            <TouchableOpacity onPress={() => dispatch(noteformActions.setReminderModalVisible(true))} className='bg-gray-300 p-1 flex-row items-center rounded-lg flex-shrink'>
                                <Ionicons name={reminder.repeat === ERepeat.DOES_NOT_REPEAT ? 'alarm-outline' : 'repeat'} size={15} color={'#6b7280'} />
                                <ThemedText className='mx-1 text-xs text-gray-500 font-semibold'>{`${getFormattedDate(reminder.datetime)}, ${getFormattedTime(reminder.datetime)}`}</ThemedText>
                            </TouchableOpacity>
                        </View>
                    }

                    {/* Reminder edit modal */}
                    <ReminderPopup />
                </View>
            </ScrollView>

            {/* bottom tool bar */}
            <ToolBar />
        </ThemedView>
    )
}