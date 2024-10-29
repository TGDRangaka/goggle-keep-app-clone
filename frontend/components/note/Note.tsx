import React, { useState } from 'react'
import { ThemedText } from '../ThemedText'
import { Modal, TouchableOpacity, View, } from 'react-native'
import { ERepeat, TNote } from '@/types/TNote'
import { Ionicons } from '@expo/vector-icons'
import NoteForm from '@/components/note-form/NoteForm'
import Images from './Images'
import List from './List'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/states/store'
import NoteService from '@/services/noteService'
import { noteformActions } from '@/states/noteFormSlice'
import { getFormattedDate, getFormattedTime } from '@/utils/utilMaters'
import { noteActions } from '@/states/noteSlice'
import { updateReminder } from '@/utils/reminders'

type Props = {
    note: TNote
}

export default function Note(props: Props) {
    const { _id, title, body, imgs, list, reminder, color } = props.note
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [notePressed, setNotePressed] = useState<boolean>(false);

    const { note, newImgs } = useSelector((root: RootState) => root.noteForm);
    const dispatch = useDispatch();

    const handleModalClose = async () => {
        setModalVisible(false);
        setTimeout(() => setNotePressed(false), 500);
        const updated = await NoteService.update(note, newImgs);
        dispatch(noteActions.updateNote(updated));
        dispatch(noteformActions.clearNote());

        updateReminder(updated);
    }

    const handleNotePress = () => {
        setNotePressed(true);
        setModalVisible(true);
    }

    return (
        <View onTouchEnd={handleNotePress}>
            <View className={`rounded-xl mb-2 overflow-hidden ${color ? '' : 'border border-gray-200'}`} style={color ? { backgroundColor: color } : null}>
                {/* images */}
                {
                    imgs && imgs.length > 0 && <Images imgs={imgs} />
                }

                <View className='p-5 pb-2'>
                    {/* Title */}
                    {
                        title && <ThemedText className='font-semibold mb-3 text-gray-700'>{title}</ThemedText>
                    }

                    {/* Body */}
                    {
                        body && <ThemedText className='text-sm max-h-40 mb-3 truncate text-gray-600 font-light'>{body}</ThemedText>
                    }

                    {/* List */}
                    {
                        list && list.length > 0 && <List list={list} />
                    }


                    {
                        (reminder || color) &&
                        <View className='flex-row items-center space-x-1 mb-3'>
                            {/* reminder */}
                            {
                                reminder &&
                                <View className={`p-1 flex-row items-center rounded-lg flex-shrink ${color ? 'bg-white/50' : 'bg-gray-300'}`}>
                                    <Ionicons name={reminder.repeat === ERepeat.DOES_NOT_REPEAT ? 'alarm-outline' : 'repeat'} size={15} color={'#6b7280'} />
                                    <ThemedText className='mx-1 text-xs text-gray-500 font-semibold'>{`${getFormattedDate(reminder.datetime)}, ${getFormattedTime(reminder.datetime)}`}</ThemedText>
                                </View>
                            }

                            {/* note color */}
                            {/* {
                                color && <View className={`h-6 w-6 rounded-full`} style={{ backgroundColor: color }}></View>
                            } */}
                        </View>
                    }
                </View>



            </View>

            {/* modal */}
            {notePressed && <Modal
                animationType='slide'
                transparent={false}
                visible={modalVisible}
                onRequestClose={handleModalClose}
            >
                <NoteForm data={props.note} closeModal={handleModalClose} />
            </Modal>}
        </View>

    )
}