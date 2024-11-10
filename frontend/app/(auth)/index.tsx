import React, { useEffect } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/states/store';
import { authActions } from '@/states/authSlice';
import { userLoginApi } from '@/services/userService';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Index = () => {
  const { isLoading, isAuthenticated } = useSelector((root: RootState) => root.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const webClientId = "830112398991-qr5iuc6oifbdmlc3qu6e1ug4sn7qi0gf.apps.googleusercontent.com";

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: webClientId,
    });

    googleLogin();
  }, []);

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.data) {
        console.log("userinfo", userInfo);

        const user = {
          name: userInfo.data.user.name,
          email: userInfo.data.user.email,
          idToken: userInfo.data.idToken,
          photoUrl: userInfo.data.user.photo,
        }

        const saved = await userLoginApi(user);

        dispatch(authActions.signInSuccess(saved));

        router.replace('/(drawer)/'); // Redirect after successful login

      }else {
        console.log("User cancelled the login process");
      }

    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("Sign-in cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Sign-in in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play services not available");
      } else {
        console.error("Sign-in error:", error);
      }
    }
  };

  return (
    <ThemedView className='flex-1 items-center py-16 px-4 bg-white'>
      <View className='flex-grow items-center justify-center'>
        <Image source={require('@/assets/images/keeps.png')} className='w-36 h-36' />
      </View>

      <Text className='mb-4 text-center text-xl'>Capture anything</Text>
      <Text className='mb-6 text-center'>Make lists, take photos, speak your mind - whatever works for you, works in Keep.</Text>

      <TouchableOpacity onPress={googleLogin} className='bg-blue-900/90 px-6 py-3 rounded-3xl'>
        <Text className='text-gray-100 font-semibold'>Get started</Text>
      </TouchableOpacity>
    </ThemedView>
  );
};

export default Index;
