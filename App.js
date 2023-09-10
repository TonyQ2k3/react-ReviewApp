import { useEffect } from 'react';
import { StyleSheet, Appearance } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import Title from './screens/Title';
import Home from './screens/Home';
import ReviewDetails from './screens/ReviewDetails';
import PostCreate from './screens/PostCreate';
import Login from './screens/Login';
import Signup from './screens/Signup';

// Import components
import InfoButton from './components/InfoButton';
import HeaderBG from './components/HeaderBG';
import Profile from './screens/Profile';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
    'raleway-regular': require('./assets/fonts/Raleway-Regular.ttf'),
    'raleway-bold': require('./assets/fonts/Raleway-Bold.ttf'),
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
      <Stack.Navigator initialRouteName='Title'>
        <Stack.Screen name="Title" 
          component={Title}
          options={{
            headerShown: false,
          }}
         />
        <Stack.Screen name="Home" 
          component={Home}
          options={ ({ navigation }) => ({
            title: 'FlixReview',
            headerTitleStyle: styles.appTitle,
            headerTitleAlign: 'left',
            headerRight: () => (<InfoButton type='account' func={() => navigation.navigate('Profile')} />),
            headerBackground: (() => <HeaderBG />),
            headerTintColor: '#fff',
          }) }
         />
        <Stack.Screen name='Details'
          component={ReviewDetails}
          options={{
            title: '',
            headerStyle: styles.headerStyle,
            headerTintColor: '#fff',
            animation: 'slide_from_right',
          }} />
        <Stack.Screen name='PostCreate'
          component={PostCreate} 
          options={{
            title: 'Create a review',
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.otherScreenTitle,
            headerTintColor: '#fff',
          }} />
        <Stack.Screen name='Login'
          component={Login}
          options={{
            title: '',
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.otherScreenTitle,
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen name='Signup'
          component={Signup}
          options={{
            title: '',
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.otherScreenTitle,
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen name='Profile'
          component={Profile}
          options={{
            title: 'User Profile',
            headerTitleAlign: 'center',
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.otherScreenTitle,
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor:  Appearance.getColorScheme() === 'dark' ? '#fff' : '#17162e', 
  },
  appTitle: {
    color: '#fff', 
    fontSize: 26, 
    fontFamily: 'raleway-bold',
  },
  otherScreenTitle: {
    color: Appearance.getColorScheme() === 'dark' ? '#000' : '#fff',
    fontSize: 22,
  }
});