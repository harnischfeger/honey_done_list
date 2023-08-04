import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import Rootstack from "./navigators/RootStack";

export default function App() {

  const [loaded] = useFonts({
    GelasioReg: require('./assets/fonts/Gelasio-Regular.ttf'),
  });
  if (!loaded) {
    return null;
  }
  return (
    <Rootstack />
  );
}

