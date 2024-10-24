import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Checkbox from 'expo-checkbox'
import { TTask } from '@/types/TTask'

type Props = {
    list: TTask[]
}

export default function List({ list }: Props) {
    const [tasks, setTasks] = useState<TTask[]>(list);
    const unchecked = [...tasks].filter(t => !t.completed);
    const completed = [...tasks].filter(t => t.completed);

    const handleAdd = () => {
        const newTask: TTask = {
            id: Math.random().toString(36).substr(2, 9),
            task: '',
            completed: false,
        }
        setTasks([...tasks, newTask]);
    }

    const handleComplete = () => {
        
    }

    return (
        <View>
            {
                unchecked.map(task => (
                    <View key={task.id} className='flex-row items-center mt-5 space-x-5'>
                        <View className='flex-row'>
                            <Ionicons name='ellipsis-vertical' size={20} />
                            <Text className='-ml-[14px]'><Ionicons name='ellipsis-vertical' size={25} /></Text>
                        </View>

                        <Checkbox value={task.completed} className='opacity-40' />

                        <TextInput className='text-lg text-gray-800 flex-grow' placeholderTextColor='#C4C3C9' value={task.task} />

                        <TouchableOpacity className='scale-150'><Ionicons name='close-outline' size={25} color={'gray'} /></TouchableOpacity>
                    </View>
                ))

            }

            {/* add list */}
            <View className='flex-row items-center mt-5 space-x-5'>
                <View className='flex-row w-[25px]' />

                <TouchableOpacity 
                onPress={handleAdd}
                className='flex-row items-center'>
                    <Ionicons name='add' size={25} color={'gray'} />
                    <Text className='ml-4 text-lg text-gray-500'>List item</Text>
                </TouchableOpacity>
            </View>

            {/* checked items */}
            {
                completed.length > 0 &&
                <View>
                    <TouchableOpacity className='flex-row items-center mt-5 space-x-5'>
                        <Ionicons name='caret-down' size={25} />
                        <Text className='ml-4 text-lg text-gray-500'>{completed.length} Checked item</Text>
                    </TouchableOpacity>

                    {
                        completed.map(task => (
                            <View key={task.id} className='flex-row items-center mt-5 space-x-5'>
                                <View className='flex-row w-[25px]' />

                                <Checkbox value={task.completed} className='opacity-40' />

                                <TextInput className='text-lg text-gray-800 flex-grow' placeholderTextColor='#C4C3C9' placeholder='Note' value={task.task} />

                                <TouchableOpacity className='scale-150'><Ionicons name='close-outline' size={25} color={'gray'} /></TouchableOpacity>
                            </View>
                        ))
                    }
                </View>
            }



        </View>
    )
}