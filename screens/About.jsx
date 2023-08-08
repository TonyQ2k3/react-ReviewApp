import React from 'react';
import { Text, View, Button, StyleSheet, ImageBackground } from 'react-native';
import { globalStyles } from '../styles/global';

const imageBG = 'https://firebasestorage.googleapis.com/v0/b/moviereview-ca8ef.appspot.com/o/main_BG_red.png?alt=media&token=795acc62-ec26-4828-911c-e70a0dcc64c5';

export default function About( {route, navigation} ) {
    return (
        <View style={{flex: 1,}}>
            <ImageBackground source={{uri: imageBG}} resizeMode='cover' style={{flex: 1}}>
                
            </ImageBackground>
        </View>
    )
}