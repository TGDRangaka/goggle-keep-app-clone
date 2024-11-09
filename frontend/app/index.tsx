// import { View, Text, Button } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { TouchableOpacity } from 'react-native-gesture-handler'
// import { useRouter } from 'expo-router'
// import { ThemedView } from '@/components/ThemedView';
// import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';

// export default function Index() {
//     const [isAuthenticated, setAuthenticated] = useState(true);
//     const [loading, setLoading] = useState(true);
//     // const [isAuthenticated, setAuthenticated] = useState(false);
//     const router = useRouter();

//     const handlRoute = () => {
//         router.push(isAuthenticated ? '/(drawer)' : '/(auth)');
//     }

//     const load = async () => {
//         await new Promise((resolve) => setTimeout(resolve, 2000));
//         setLoading(false);
//         // if (isAuthenticated) {
//         //     router.push('/(drawer)')
//         // } else {
//         //     router.push('/(auth)')
//         // }
//     }

//     const login = async () => {
//         try {
//             // 830112398991-qr5iuc6oifbdmlc3qu6e1ug4sn7qi0gf.apps.googleusercontent.com
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     useEffect(()=>{
//         GoogleSignin.configure({
//             webClientId: '830112398991-qr5iuc6oifbdmlc3qu6e1ug4sn7qi0gf.apps.googleusercontent.com', 
//         })  
//     },[])
// // use the client id in the google-services.json file under the "oauth_client" 
// // (clinet_type : 3)

//     useEffect(() => {
//         load();
//     }, [])

//     return loading
//         ? (
//             <ThemedView className='flex-1 justify-center items-center'>
//                 <Text>Loading...</Text>
//             </ThemedView>
//         )
//         : (
//             <View className='flex-1 justify-center items-center'>
//                 <Text>Indexxxxxx</Text>
//                 <TouchableOpacity onPress={login}><Text>Login</Text></TouchableOpacity>
//             </View>
//         )
// }







import React, {useRef, useEffect, useState} from 'react';
import { StyleSheet, View, Text, Dimensions, ImageBackground, Image, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Index = () => {

    const webClientId = "830112398991-qr5iuc6oifbdmlc3qu6e1ug4sn7qi0gf.apps.googleusercontent.com"; 

    useEffect(()=>{
        GoogleSignin.configure({
            webClientId: webClientId,
        })
    },[])

    const googleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log("userinfo", userInfo);

        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log(error)
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log(error)
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log(error)
            } else {
            }
        }
      };
    return(
      <View style={{margin:20}}>
          <Pressable onPress={googleLogin}>
          <View style={styles.loginButton}>
                <View style={{marginLeft:5}}>
                    <Text style={{color: '#222222',fontWeight:'400',fontSize:18}}>
                        Login with Google
                    </Text>
                </View>
              </View>
          </Pressable>
      </View>
    );
}

const styles= StyleSheet.create({
    loginButton: {
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#FFFFFF",
        width:screenWidth-50,
        height:48,
        borderRadius:10
    }
});

export default Index;