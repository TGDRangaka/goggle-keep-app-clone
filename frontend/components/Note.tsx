import React from 'react'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'
import { Image, TouchableOpacity } from 'react-native'
import { TNote } from '@/types/TNote'

type Props = {
    note?: TNote
}

export default function Note(props: Props) {
    if (!props.note) return <></>

    const { title, body, type, imgs } = props.note

    return props.note && (
        <TouchableOpacity>
            <ThemedView className='border border-gray-600 p-5 rounded-xl mb-2'>
                {title && <ThemedText className='font-semibold mb-3'>{title}</ThemedText>}
                {body && <ThemedText className='text-sm max-h-40 truncate text-gray-200'>{body}</ThemedText>}
            </ThemedView>
        </TouchableOpacity>

    )
}