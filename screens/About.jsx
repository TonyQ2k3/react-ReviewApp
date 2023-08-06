import React from 'react';
import { Text, View, Button, StyleSheet, ImageBackground } from 'react-native';
import { globalStyles } from '../styles/global';

const imageBG = require('../assets/mainBG.png');

export default function About( {route, navigation} ) {
    return (
        <View style={{flex: 1,}}>
            <ImageBackground source={imageBG} resizeMode='cover' style={{flex: 1}}>
                
            </ImageBackground>
        </View>
    )
}