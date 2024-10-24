import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

type Props = {
    imgs: any[]
}

export default function Images({ imgs }: Props) {
    const [allHeight, setAllHeight] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [imgsData, setImgsData] = useState<{a: number, img: any}[]>([]);

    const handleLayout = (event: any) => {
        // get parent width
        let { width } = event.nativeEvent.layout;

        // get tot aspect ratio of imgs
        const totAspect = imgs.reduce((acc, img) => {
            const { width, height } = Image.resolveAssetSource(img);
            const aspectRatio = (width / height);
            setImgsData(data => [...data, { a: aspectRatio, img: img }])
            return acc + aspectRatio;
        }, 0);

        width -= (imgs.length - 1) * 4

        // calculate total height
        const totalHeight = width / totAspect;
        setAllHeight(totalHeight);
        setLoading(false);
        // alert([width, totAspect, totalHeight, imgsData].join(' | '))
    };

    const imageSource = imgs[0];
    const { width, height } = Image.resolveAssetSource(imageSource);
    const aspectRatio = width / height;

    return (
        <View style={{ width: '100%', height: allHeight }} onLayout={handleLayout} className='flex-row space-x-1'>
            {/* Image */}
            {
                isLoading
                    ? <ActivityIndicator />
                    : imgsData.length > 0
                        ? imgsData.map((data, i) => (
                            <View key={i} style={{ height: allHeight, aspectRatio: data.a }}>
                                <Image
                                    source={data.img}
                                    className="mb-3 h-full w-full"
                                />
                                {/* <LinearGradient
                                    colors={['transparent', 'rgba(0, 0, 0, 0.4)']}
                                    className='w-full h-full absolute'
                                >
                                    <TouchableOpacity className='absolute right-1 bottom-1'>
                                        <Ionicons name='sync' color='white' size={20} />
                                    </TouchableOpacity>
                                </LinearGradient> */}
                            </View>
                        ))
                        : <></>
            }
        </View>
    )
}