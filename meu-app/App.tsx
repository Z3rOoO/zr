import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import HomeScreen from "./src/screens/HomeScreen";
import DevScreen from "./src/screens/DevScreen";

export default function App() {
  // Mostra a tela de QR code quando rodando na web
  if (Platform.OS === 'web') {
    return <DevScreen />;
  }

  return <HomeScreen />;
}

