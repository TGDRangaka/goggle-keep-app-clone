import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { ThemedText } from '../ThemedText'
import { lightColors } from '@/data/colors'
import { noteformActions } from '@/states/noteFormSlice'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/states/store'

export default function ChooseColor() {
    const { color } = useSelector((root: RootState) => root.noteForm.note);
    const dispatch = useDispatch();
    return (
        <>
            <ThemedText className='my-4 pl-3'>Color</ThemedText>
            <ScrollView className='w-screen' horizontal>
                <View className='my-2 flex-row space-x-2 mx-3'>
                    {
                        lightColors.map((clr, i) => (
                            <TouchableOpacity
                                onPress={() => dispatch(noteformActions.setColor(clr))}
                                key={i}
                                className={`w-12 h-12 rounded-full justify-center items-center ${(color && color == clr) ? 'border-2 border-blue-800' : 'border border-gray-600'}`}
                                style={{ backgroundColor: clr }}
                            >
                                {
                                    i == 0 && color !== clr && <View className='justify-center items-center'>
                                        <Ionicons name='water-outline' size={34} color={'#4b5563'} />
                                        <View className='w-10 rotate-45 absolute border-t-[3px] border-b-[3px] border-b-gray-600 border-t-white' />
                                    </View>
                                }
                                {color && color === clr && <Ionicons name='checkmark-outline' size={34} color={'#1e40af'} />}
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </ScrollView>
        </>
    )
}