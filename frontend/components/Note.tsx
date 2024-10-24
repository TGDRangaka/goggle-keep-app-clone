import React, { useState } from 'react'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'
import { Image, Modal, TouchableOpacity, View, Image as RImage } from 'react-native'
import { TNote } from '@/types/TNote'
import { Ionicons } from '@expo/vector-icons'
import NoteForm from '@/screens/NoteForm'
import { Image as Img } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import Checkbox from 'expo-checkbox'
import Images from './note/Images'
import List from './note/List'

type Props = {
    note: TNote
}

export default function Note(props: Props) {
    const { id, title, body, imgs, list, reminder, color, createdDate } = props.note
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const imageSource = require('@/assets/images/icon.png');
    const { width, height } = RImage.resolveAssetSource(imageSource);
    const aspectRatio = width / height; // Calculate the aspect ratio

    return (
        <TouchableOpacity
            onPress={() => setModalVisible(true)}
        >
            <View className='border border-gray-400 rounded-xl mb-2 overflow-hidden' style={color ? { borderColor: color} : null}>
                {/* images */}
                {
                    imgs && imgs.length > 0 && <Images imgs={imgs} />
                }

                <View className='p-5 pb-2'>
                    {/* Title */}
                    {
                        title && <ThemedText className='font-semibold mb-3 text-gray-500'>{title}</ThemedText>
                    }

                    {/* Body */}
                    {
                        body && <ThemedText className='text-sm max-h-40 mb-3 truncate text-gray-400 font-light'>{body}</ThemedText>
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
                                <View className='bg-gray-300 p-1 flex-row items-center rounded-lg flex-shrink'>
                                    <Ionicons name='alarm-outline' size={15} color={'#6b7280'} />
                                    <ThemedText className='mx-1 text-xs text-gray-500 font-semibold'>{'Tomorrow, 08:00'}</ThemedText>
                                </View>
                            }

                            {/* note color */}
                            {
                                color && <View className={`h-6 w-6 rounded-full`} style={{ backgroundColor: color}}></View>
                            }
                        </View>
                    }
                </View>



            </View>

            {/* modal */}
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <NoteForm note={props.note} />
            </Modal>
        </TouchableOpacity>

    )
}