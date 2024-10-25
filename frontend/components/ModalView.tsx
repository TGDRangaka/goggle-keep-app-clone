import { View, Text, Modal } from 'react-native'
import React from 'react'

type Props = {
    visible: boolean;
    children: React.ReactNode;
    onClose?: () => void;
    setVisible: (v: boolean) => void;
}

export default function ModalView({ children, setVisible, visible, onClose }: Props) {
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                onClose && onClose();
                setVisible(false);
            }}
        >
            <View className='flex-1'>
                <View className='flex-grow' onTouchStart={() => setVisible(false)} />
                {children}
            </View>
        </Modal>
    )
}