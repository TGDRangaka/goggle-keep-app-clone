import { TouchableOpacity, Modal, View, Button } from 'react-native';
import React, { useState } from 'react';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/states/store';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { authActions } from '@/states/authSlice';

export default function Header() {
  const { user } = useSelector((root: RootState) => root.auth);
  const navigation = useNavigation();
  const router = useRouter();
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  const handleMenuClick = () => {
    navigation.toggleDrawer();
  };

  const handleSearchPress = () => {
    router.push('/search');
  };

  const handleProfilePress = () => {
    setModalVisible(true); // Show modal on profile image press
  };

  const handleSignOut = async () => {
    try {
      await GoogleSignin.signOut(); // Sign out from Google
      dispatch(authActions.signOut()); // Update Redux state
      router.replace('/'); // Navigate back to login screen
    } catch (error) {
      console.error("Error signing out:", error);
    }
    setModalVisible(false); // Close modal
  };

  const handleSwitchAccount = async () => {
    await handleSignOut(); // Sign out of the current account
  };

  return (
    <ThemedView className='bg-gray-100 w-full py-2 px-5 mb-5 rounded-full flex-row items-center space-x-3'>
      <TouchableOpacity onPress={handleMenuClick}>
        <Ionicons name='menu' size={30} color='#b9b9c4' />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSearchPress} className='flex-grow'>
        <ThemedText>Search your notes</ThemedText>
      </TouchableOpacity>

      <Ionicons name='grid-outline' size={25} color='#b9b9c4' />
      
      {/* Profile Image with onPress */}
      <TouchableOpacity onPress={handleProfilePress}>
        <ThemedView className='w-8 aspect-square bg-transparent rounded-full -mr-2'>
          <Image source={{ uri: user ? user.photoUrl : '' }} contentFit="cover" className='w-8 aspect-square rounded-full' />
        </ThemedView>
      </TouchableOpacity>

      {/* Modal for Account Options */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
            <Button title="Switch Account" onPress={handleSwitchAccount} />
            <Button title="Sign Out" onPress={handleSignOut} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}
