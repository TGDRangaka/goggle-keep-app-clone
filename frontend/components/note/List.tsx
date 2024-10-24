import { View, Text } from 'react-native'
import React from 'react'
import { TTask } from '@/types/TTask'
import Checkbox from 'expo-checkbox'
import { ThemedText } from '../ThemedText'

type Props = {
    list: TTask[]
}

export default function List({ list }: Props) {
    const uncheckedTasks = [...list].filter(l => !l.completed);
    const checkedTasksCount = [...list].filter(l => l.completed).length;

    return (
        <View className='pb-3'>
            {/* unchecked tasks */}
            {
                uncheckedTasks.map((l) => (
                    <View key={l.id} className="flex-row items-center">
                        <Checkbox className="w-3 h-3 border mr-1" />
                        <ThemedText className="text-sm text-gray-600 font-light">{l.task}</ThemedText>
                    </View>
                ))
            }

            {/* checked tasks count */}
            {
                checkedTasksCount > 0 &&
                <ThemedText className='text-xs text-gray-500 mt-3 ml-1 font-semibold'>
                    + {checkedTasksCount} checked items
                </ThemedText>
            }
        </View>
    )
}