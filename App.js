import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import About from './screens/About';
import ReviewDetails from './screens/ReviewDetails';
import PostCreate from './screens/PostCreate';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'playfair-regular': require('./assets/fonts/PlayfairDisplay-Regular.ttf'),
    'playfair-medium': require('./assets/fonts/PlayfairDisplay-Medium.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded)
    return null;
  else SplashScreen.hideAsync();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" 
            component={Home}
            options={{
              title: '🎬 The Review App',
              headerStyle: styles.headerStyle,
              headerTitleStyle: styles.appTitle,
              headerTitleAlign: 'center',
            }} />
          <Stack.Screen name='About'
            component={About} />
          <Stack.Screen name='Details'
            component={ReviewDetails}
            options={{
              headerStyle: styles.headerStyle,
              headerTitleStyle: styles.otherScreenTitle,
            }} />
          <Stack.Screen name='PostCreate'
            component={PostCreate} 
            options={{
              title: 'Create a review'
            }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#000000', 
  },
  appTitle: {
    color: '#CB976B', 
    fontSize: 26, 
    fontFamily: 'playfair-medium',
  },
  otherScreenTitle: {
    color: '#fff',
  }
});