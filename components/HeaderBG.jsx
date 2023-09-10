import React from 'react';
import { Image } from 'react-native';

export default function HeaderBG() {
    return (
        <Image
            source={require('../assets/header.jpg')}
            resizeMode='cover'
            style={{flex: 1,}}
        />
    )
}