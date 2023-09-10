import React from 'react';
import { Image } from 'react-native';

export default function HeaderBG() {
    return (
        <Image
            style={{
                position: 'absolute',
                top: -30,
                left: -30,
                bottom: 0,
                right: -5,
            }}
            source={require('../assets/header.jpg')}
        />
    )
}