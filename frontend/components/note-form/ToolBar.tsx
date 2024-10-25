import { View, Text, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import ModalView from '../ModalView';

const iconColor = '#5D5C62'

export default function ToolBar() {
    const [addModal, setAddModal] = useState(false);
    const [colorPeletteModal, setColorPeletteModal] = useState(false);

    return (
        <>
            <View className='flex-row w-full space-x-4 pl-4 px-4 items-center justify-end h-12 absolute bottom-0'>
                <TouchableOpacity onPress={() => setAddModal(true)} className='border-[3px] rounded-md border-[#5D5C62] scale-75'><Ionicons name='add-outline' size={30} color={iconColor} /></TouchableOpacity>
                <TouchableOpacity onPress={() => setColorPeletteModal(true)}><Ionicons name='color-palette-outline' size={30} color={iconColor} /></TouchableOpacity>
                <TouchableOpacity><Ionicons name='text-outline' size={30} color={iconColor} /></TouchableOpacity>
                <ThemedText className='text-xs flex-grow pl-4 text-gray-400'>Edited just now</ThemedText>

                <TouchableOpacity><Ionicons name='ellipsis-vertical' size={30} color={iconColor} /></TouchableOpacity>
            </View>


            {/* add modal */}
            <ModalView visible={addModal} setVisible={setAddModal}>
                <ThemedView className='h-[400px] bg-gray-400'></ThemedView>
            </ModalView>

            {/* color pelette modal */}
            <ModalView visible={colorPeletteModal} setVisible={setColorPeletteModal}>
                <ThemedView className='h-[100%] bg-gray-400'></ThemedView>
            </ModalView>
        </>
    )
}