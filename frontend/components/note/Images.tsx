import { View, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { TImage } from '@/types/TImage';

type Props = {
    imgs: TImage[];
}

export default function Images({ imgs }: Props) {
    const [allHeight, setAllHeight] = useState(0);
    if (imgs.length === 0) return;
    const [isLoading, setLoading] = useState(true);
    const [imgsData, setImgsData] = useState<{ a: number, img: string }[]>([]);

    useEffect(() => {
        let loadedImages: { a: number, img: string }[] = [];
        let imagesProcessed = 0;

        imgs.forEach((img) => {
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
        // console.log(imgs);
    }, [imgs]);

    const handleLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        const totalAspect = imgsData.reduce((acc, data) => acc + data.a, 0);
        const availableWidth = width - (imgs.length - 1) * 4; // account for spacing between images

        // Calculate total height based on the combined aspect ratios
        const totalHeight = availableWidth / totalAspect;
        setAllHeight(totalHeight);
    };

    return !isLoading && (
        <View style={{ width: '100%', height: allHeight }} onLayout={handleLayout} className='flex-row space-x-1'>
            {imgsData.map((data, i) => (
                <View key={i} style={{ height: allHeight, aspectRatio: data.a }}>
                    <Image
                        source={{ uri: data.img }}
                        style={{ width: '100%', height: '100%' }}
                        className="mb-3 h-full w-full"
                    />
                </View>
            ))}
        </View>
    );
}
