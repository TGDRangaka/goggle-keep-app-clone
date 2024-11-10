import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/states/store';
import { authActions } from '@/states/authSlice';
import { userLoginApi } from '@/services/userService';

const Index = () => {
    const { isLoading, isAuthenticated } = useSelector((root: RootState) => root.auth);
    const dispatch = useDispatch();
    const router = useRouter();

    const webClientId = "830112398991-qr5iuc6oifbdmlc3qu6e1ug4sn7qi0gf.apps.googleusercontent.com";

    useEffect(() => {
        const loader = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            dispatch(authActions.setLoading(false));
        }

        loader();
    }, [])

    useEffect(() => {
        if (!isLoading) {
            GoogleSignin.configure({
                webClientId: webClientId,
            });

            googleLogin();
        }

    }, [isLoading]);

    const googleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            if (userInfo.data) {
                // console.log("userinfo", userInfo);

                const user = {
                    name: userInfo.data.user.name,
                    email: userInfo.data.user.email,
                    idToken: userInfo.data.idToken,
                    photoUrl: userInfo.data.user.photo,
                }

                const saved = await userLoginApi(user);

                dispatch(authActions.signInSuccess(saved));

                // if first time -wellcomeScreen, else -homeScreen
                router.push('/(drawer)/');

            } else {
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

            <Text className='mb-4 text-center text-3xl font-semibold text-gray-600'>Google <Text className='font-normal'>Workspace</Text></Text>
        </ThemedView>
    );
};

export default Index;
