import { View, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/states/store';

export default function Images() {
    const { newImgs } = useSelector((root: RootState) => root.noteForm);
    const { imgs } = useSelector((root: RootState) => root.noteForm.note);
    if (!imgs) return;

    const [allHeight, setAllHeight] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [imgsData, setImgsData] = useState<{ a: number, img: string }[]>([]);

    useEffect(() => {
        // Reset state
        setAllHeight(0);
        setLoading(true);
        setImgsData([]);

        let loadedImages: { a: number, img: string }[] = [];
        let imagesProcessed = 0;

        [...imgs].forEach((img) => {
            // Use Image.getSize to get the width and height of the image
            Image.getSize(
                img.uri,
                (width, height) => {
                    const aspectRatio = width / height;
                    loadedImages.push({ a: aspectRatio, img: img.uri });
                    imagesProcessed += 1;

                    // If all images are processed, update state
                    if (imagesProcessed === imgs.length) {
                        setImgsData(loadedImages);
                        setLoading(false);
                    }
                },
                (error) => {
                    console.warn(`Failed to load image ${img.uri}: ${error.message}`);
                    imagesProcessed += 1;

                    // Even on error, check if all images are processed
                    if (imagesProcessed === imgs.length) {
                        setImgsData(loadedImages);
                        setLoading(false);
                    }
                }
            );
        });
    }, [imgs]);

    const handleLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        const totalAspect = imgsData.reduce((acc, data) => acc + data.a, 0);
        const availableWidth = width - (imgs.length - 1) * 4; // account for spacing between images

        // Calculate total height based on the combined aspect ratios
        const totalHeight = availableWidth / totalAspect;
        setAllHeight(totalHeight);
    };

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
                                    source={{ uri: data.img }}
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