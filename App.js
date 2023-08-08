import { useEffect, useState } from 'react';
import { StyleSheet, Appearance, Image } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import About from './screens/About';
import ReviewDetails from './screens/ReviewDetails';
import PostCreate from './screens/PostCreate';
import InfoButton from './components/InfoButton';
import HeaderBG from './components/HeaderBG';

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
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" 
          component={Home}
          options={ ({ route, navigation }) => ({
            title: '🎞️ FlixReview',
            headerTitleStyle: styles.appTitle,
            headerTitleAlign: 'center',
            headerRight: () => (<InfoButton func={() => navigation.navigate('About')} />),
            headerBackground: (() => <HeaderBG />)
          }) }
         />
        <Stack.Screen name='About'
          component={About}
          options={{
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.otherScreenTitle,
            animation: 'slide_from_bottom',
          }} />
        <Stack.Screen name='Details'
          component={ReviewDetails}
          options={{
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.otherScreenTitle,
          }} />
        <Stack.Screen name='PostCreate'
          component={PostCreate} 
          options={{
            title: 'Create a review',
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.otherScreenTitle,
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor:  Appearance.getColorScheme() === 'dark' ? '#fff' : '#D94848', 
  },
  appTitle: {
    color: '#fff', 
    fontSize: 26, 
    fontFamily: 'playfair-medium',
  },
  otherScreenTitle: {
    color: Appearance.getColorScheme() === 'dark' ? '#000' : '#fff',
  }
});