import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Image, Alert } from 'react-native';
import { globalStyles } from '../styles/global';
import { auth } from '../firebase/index';

export default function Profile({route, navigation}) {
    const user = auth.currentUser;

    const handleSignOut = () => {
        Alert.alert('Log Out', 'Do you want to log out?', [
        {
            text: 'Yes',
            onPress: () => {
                auth.signOut()
                .then(() => {
                    navigation.navigate('Home');
                })
            },
        },
        {
            text: 'Cancel',
        },
        ]);
    }

    return (
        <ImageBackground source={require('../assets/main_BG_alt.png')} style={globalStyles.container}>
        {
            user !== null 
            ? (
                <View style={styles.profileContainer}>
                    <View>
                        <Image source={require('../assets/anon_user.png')} style={styles.userAvatar} />
                        <Text style={styles.userTitle}>{user.displayName}</Text>
                    </View>
                    <TouchableOpacity style={globalStyles.submitBtn} onPress={handleSignOut}>
                        <Text style={{color: '#fff', fontSize: 20,}}>Sign out</Text>
                    </TouchableOpacity>
                </View>
            )
            : (
                <View style={{margin: 20,}}>
                    <Text style={globalStyles.titleText}>You are not logged in!</Text>
                    <Text style={globalStyles.titleText}>Please sign in to use more feature of the app.</Text>
                    <TouchableOpacity style={globalStyles.submitBtn} onPress={() => navigation.navigate('Login')}>
                        <Text style={{color: '#fff', fontSize: 20,}}>Login</Text>
                    </TouchableOpacity>

                </View>
            )
        }
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userTitle: {
        color: '#fff',
        fontSize: 25,
        fontFamily: 'nunito-bold',
        textAlign: 'center',
    },
    userAvatar: {
        height: 200,
        width: 200,
        marginBottom: 10,
        borderRadius: 10,
    },
});