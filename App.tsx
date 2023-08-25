import 'react-native-gesture-handler';
import 'expo-dev-client';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import Rootstack from "./navigators/RootStack";
import * as Notifications from 'expo-notifications'; 
import * as Device from 'expo-device';
import { useEffect } from 'react';

export default function App() {
  const [loaded] = useFonts({
    GelasioReg: require('./assets/fonts/Gelasio-Regular.ttf'),
  });
  const getPermission = async () => {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }

  useEffect(()=>{

    getPermission(); 

  },[]); 
  
  if (!loaded) {
    return null;
  }
  return (
    <Rootstack />
  );
}

