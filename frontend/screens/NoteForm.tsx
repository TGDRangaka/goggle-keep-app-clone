import { View, Text, TouchableOpacity, TextInput, Modal, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { EvilIcons, Ionicons } from '@expo/vector-icons'
import { ThemedText } from '@/components/ThemedText'
import { TNote } from '@/types/TNote'
import Header from '@/components/note-form/Header'
import Images from '@/components/note-form/Images'
import Checkbox from 'expo-checkbox'
import { TTask } from '@/types/TTask'
import List from '@/components/note-form/List'

const iconColor = '#5D5C62'
type Props = {
    note?: TNote;
}

export default function NoteForm({ note }: Props) {
    const [colorPeletteModal, setColorPeletteModal] = useState(false);
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [imgs, setImgs] = useState<any[]>([]);
    const [list, setList] = useState<TTask[]>([]);
    const [isNote, setIsNote] = useState<boolean>(true);

    useEffect(() => {
        if (note) {
            note.title && setTitle(note.title);
            note.body && setBody(note.body);
            note.imgs && note.imgs.length > 0 && setImgs(note.imgs);
            note.list && note.list.length > 0 && setList(note.list);
            if (note.list) {
                setIsNote(false);
            }
        }

        return () => {
            // save
            if (note) {
                // update note
                // alert('update note');
            } else {
                // create note
                // alert('create note');
            }
            // alert(JSON.stringify(note));
        }
    }, [])

    return (
        <ThemedView className='flex-1 w-full'>
            {/* Header */}
            <Header />

            <ScrollView className='mb-12'>
                {/* images */}
                <View className='flex-row w-full mt-5'>
                    {
                        imgs && imgs.length > 0 && <Images imgs={imgs} />
                    }
                </View>

                <View className='px-4'>
                    {/* Title */}
                    <TextInput
                        className='w-screen mt-5 text-2xl text-gray-800'
                        placeholderTextColor='#99989E'
                        placeholder='Title'
                        multiline={true}
                        value={title} onChangeText={t => setTitle(t)} />

                    {/* Note */}
                    {
                        isNote && <TextInput
                            className='w-screen mt-5 text-lg text-gray-800'
                            placeholderTextColor='#C4C3C9'
                            placeholder='Note'
                            multiline={true}
                            value={body}
                            onChangeText={t => setBody(t)} />
                    }

                    {/* checkboxes */}
                    {
                        list && list.length > 0 && <List list={list} />
                    }

                    {/* reminder */}
                    {
                        note?.reminder &&
                        <View className='flex-row w-full ml-[45px] mt-5'>
                            <View className='bg-gray-300 p-1 flex-row items-center rounded-lg flex-shrink'>
                                <Ionicons name='alarm-outline' size={15} color={'#6b7280'} />
                                <ThemedText className='mx-1 text-xs text-gray-500 font-semibold'>{'Tomorrow, 08:00'}</ThemedText>
                            </View>
                        </View>
                    }
                </View>
            </ScrollView>

            {/* bottom tool bar */}
            <View className='flex-row w-full space-x-4 pl-4 px-4 items-center justify-end h-12 absolute bottom-0'>
                <TouchableOpacity className='border-[3px] rounded-md border-[#5D5C62] scale-75'><Ionicons name='add-outline' size={30} color={iconColor} /></TouchableOpacity>
                <TouchableOpacity onPress={() => setColorPeletteModal(true)}><Ionicons name='color-palette-outline' size={30} color={iconColor} /></TouchableOpacity>
                <TouchableOpacity><Ionicons name='text-outline' size={30} color={iconColor} /></TouchableOpacity>
                <ThemedText className='text-xs flex-grow pl-4 text-gray-400'>Edited just now</ThemedText>

                <TouchableOpacity><Ionicons name='ellipsis-vertical' size={30} color={iconColor} /></TouchableOpacity>
            </View>

            {/* modals */}
            <Modal
                animationType='slide'
                transparent={true}
                visible={colorPeletteModal}
                onRequestClose={() => {
                    setColorPeletteModal(false);
                }}
            >
                <ThemedView className='flex-1'>

                </ThemedView>
            </Modal>
        </ThemedView>
    )
}