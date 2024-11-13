import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import ModalView from '../ModalView';
import Option from './Option';
import ChooseColor from './ChooseColor';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import { noteformActions } from '@/states/noteFormSlice';

const iconColor = '#5D5C62'

export default function ToolBar({ type, closeModal }: any) {
    const [addModal, setAddModal] = useState(false);
    const [colorPeletteModal, setColorPeletteModal] = useState(false);
    const [moreOptionsModal, setMoreOptionsModal] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (type && type === 'image') {
            pickImage();
        }
    }, [])

    // pick image
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            // aspect: [4, 3],
            // quality: 1,
        });

        if (!result.canceled) {
            //   setImage(result.assets[0].uri);
            for (const asset of result.assets) {
                dispatch(noteformActions.addImage(asset.uri))
                dispatch(noteformActions.addNewImg(asset.uri))
            }
        }
    };

    const onPressDelete = () => {
        // dispatch(noteformActions.setIsDelete(true));
        closeModal(true);
    }

    return (
        <>
            <View className='flex-row w-full space-x-4 pl-4 px-4 items-center justify-end h-12 absolute bottom-0'>
                <TouchableOpacity onPress={() => setAddModal(true)} className='border-[3px] rounded-md border-[#5D5C62] scale-75'><Ionicons name='add-outline' size={30} color={iconColor} /></TouchableOpacity>
                <TouchableOpacity onPress={() => setColorPeletteModal(true)}><Ionicons name='color-palette-outline' size={30} color={iconColor} /></TouchableOpacity>
                <TouchableOpacity><Ionicons name='text-outline' size={30} color={iconColor} /></TouchableOpacity>
                <ThemedText className='text-xs flex-grow pl-4 text-gray-400'>Edited just now</ThemedText>

                <TouchableOpacity onPress={() => setMoreOptionsModal(true)}><Ionicons name='ellipsis-vertical' size={30} color={iconColor} /></TouchableOpacity>
            </View>


            {/* add modal */}
            <ModalView visible={addModal} setVisible={setAddModal}>
                <ThemedView className='bg-gray-200 pl-3'>
                    <Option text="Take image" icon='camera-outline' />
                    <Option text="Add image" icon='image-outline' onPress={pickImage} />
                    <Option text="Drawing" icon='brush-outline' />
                    <Option text="Recording" icon='mic-outline' />
                    <Option text="Checkboxes" icon='checkbox-outline' onPress={() => dispatch(noteformActions.selectCheckboxes())} />
                </ThemedView>
            </ModalView>

            {/* color pelette modal */}
            <ModalView visible={colorPeletteModal} setVisible={setColorPeletteModal}>
                <ThemedView className=' bg-gray-200 pb-2'>
                    <ChooseColor />
                    <ChooseColor />
                </ThemedView>
            </ModalView>

            {/* more options modal */}
            <ModalView visible={moreOptionsModal} setVisible={setMoreOptionsModal}>
                <ThemedView className='bg-gray-200 pl-3'>
                    <Option text="Delete note" icon='trash-outline' onPress={onPressDelete} />
                    <Option text="Make a copy" icon='copy-outline' />
                    <Option text="Send" icon='share-social-outline' />
                    <Option text="Collaborator" icon='person-add-outline' />
                    <Option text="Labels" icon='bookmark-outline' />
                    <Option text="Help & feedback" icon='help-circle-outline' />
                </ThemedView>
            </ModalView>
        </>
    )
}