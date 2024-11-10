import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { Ionicons } from '@expo/vector-icons'
import SearchOption from '@/components/search/SearchOption'
import { lightColors } from '@/data/colors'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import api, { EAPIS } from '@/services/api'
import { TNote } from '@/types/TNote'
import Note from '@/components/note/Note'
import { RootState } from '@/states/store'

enum SearchOptions {
    REMINDERS = 'reminders',
    LISTS = 'lists',
    IMAGES = 'images',
}

export default function SearchScreen() {
    const { notes } = useSelector((root: RootState) => root.note);
    const [usedColors, setUsedColors] = useState(lightColors);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchNotes, setSearchNotes] = useState<TNote[]>([]);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onSearchType = (text: any) => {
        if (searchNotes.length > 0) {
            setSearchNotes(notes.filter(note =>
                note.body?.includes(text) ||
                note.title?.includes(text)
            )
            )
        } else {
            const filtered = notes.filter(note =>
                note.body?.includes(text) ||
                note.title?.includes(text)
            )
            setSearchNotes(filtered);
        }
    }

    const onSearchOptionPress = async (opt: SearchOptions) => {
        // try {
        //     setLoading(true);
        //     const respond = await api.get(
        //         opt == SearchOptions.REMINDERS ? EAPIS.NOTE_REMINDERS
        //             : opt == SearchOptions.LISTS ? EAPIS.NOTE_LISTS
        //                 : EAPIS.NOTE_IMAGES
        //     );
        //     if (respond.status === 200) {
        //         setSearchNotes(respond.data.data);
        //         return;
        //     }
        //     console.error('Failed to fetch notes by: ', opt);
        // } catch (err) {
        //     console.error('Error fetching notes: ', opt, err);
        // } finally {
        //     setLoading(false);
        // }
        if (opt === SearchOptions.REMINDERS) {
            setSearchNotes(notes.filter(n => n.reminder));
        } else if (opt == SearchOptions.LISTS) {
            setSearchNotes(notes.filter(n => n.list && n.list.length > 0));
        } else if (opt == SearchOptions.IMAGES) {
            setSearchNotes(notes.filter(n => n.imgs && n.imgs.length > 0));
        }
    }

    const onColorPress = async (color: string) => {
        // try {
        //     setLoading(true);
        //     const respond = await api.get(`${EAPIS.NOTE_COLOR}/${color.replace('#', '')}`);
        //     if (respond.status === 200) {
        //         setSearchNotes(respond.data.data);
        //         return;
        //     }
        //     throw new Error('Failed to fetch notes by color: ' + color);
        // } catch (err) {
        //     console.error('Error fetching notes: ', color, err);
        //     console.log(err);
        // } finally {
        //     setLoading(false);
        // }
        setSearchNotes(notes.filter(n => n.color === color));
    }

    const onBackPress = () => navigation.goBack()

    if (loading) return (
        <View className='flex-1 h-full justify-center items-center'>
            <Text className='animate-pulse'>Loading...</Text>
        </View>
    )

    if (!loading && searchNotes && searchNotes.length > 0) {
        return (
            <ScrollView>
                <ThemedView className='h-screen'>
                    <View className='flex-row p-3 pt-10 h-24 items-center bg-gray-200'>
                        <TouchableOpacity onPress={onBackPress}>
                            <Ionicons name='arrow-back' size={30} />
                        </TouchableOpacity>
                        <TextInput
                            className='flex-grow ml-5'
                            placeholder='Search your notes'
                        />
                    </View>

                    {/* notes */}
                    <ThemedView className="flex-row flex-grow justify-center w-full pb-16 px-2 pt-2">
                        <ThemedView className="w-1/2 flex-col p-1">
                            {
                                searchNotes.filter((_, i) => i % 2 == 0).map((note) => (
                                    <Note key={note._id} note={note} />
                                ))
                            }
                        </ThemedView>


                        <ThemedView className="w-1/2 flex-col p-1">
                            {
                                searchNotes.filter((_, i) => i % 2 != 0).map((note) => (
                                    <Note key={note._id} note={note} />
                                ))
                            }
                        </ThemedView>
                    </ThemedView>
                </ThemedView>
            </ScrollView>
        )
    }

    return (
        <ScrollView>
            <ThemedView className='flex-1'>
                <View className='flex-row p-3 pt-10 h-24 items-center bg-gray-200'>
                    <TouchableOpacity onPress={onBackPress}>
                        <Ionicons name='arrow-back' size={30} />
                    </TouchableOpacity>
                    <TextInput
                        value={searchText}
                        className='flex-grow ml-5'
                        placeholder='Search your notes'
                        onChangeText={onSearchType}
                    />
                </View>

                <View className='px-2 mt-3 space-y-4'>
                    <View>
                        <Text className='mb-2'>Types</Text>
                        <View className='flex-row justify-between items-center'>
                            <SearchOption onPress={() => onSearchOptionPress(SearchOptions.REMINDERS)} text='Reimders' icon='notifications-outline' />
                            <SearchOption onPress={() => onSearchOptionPress(SearchOptions.LISTS)} text='Lists' icon='checkbox-outline' />
                            <SearchOption onPress={() => onSearchOptionPress(SearchOptions.IMAGES)} text='Images' icon='image-outline' />
                        </View>
                    </View>

                    <View>
                        <Text className='mb-2'>Things</Text>
                        <View className='flex-row justify-between items-center'>
                            <SearchOption text='Music' icon='headset-outline' />
                            <SearchOption text='Places' icon='location-outline' />
                            <SearchOption text='Travel' icon='airplane' />
                        </View>
                    </View>

                    <View>
                        <Text className='mb-2'>Colors</Text>
                        <View className='flex-row items-center justify-between flex-wrap space-y-4'>
                            {
                                usedColors.map((clr, i) => (
                                    <TouchableOpacity onPress={() => onColorPress(clr)} key={clr}>
                                        <View className='w-16 mr-4 aspect-square rounded-full border border-gray-400' style={{ backgroundColor: clr }} />
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </View>
                </View>

            </ThemedView>
        </ScrollView>

    )
}