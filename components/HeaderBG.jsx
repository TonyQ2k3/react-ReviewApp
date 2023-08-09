import React from 'react';
import { Image, StyleSheet } from 'react-native';

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
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/moviereview-ca8ef.appspot.com/o/header.png?alt=media&token=df8baff4-187c-4baf-875b-3c0e9fddab6f' }}
        />
    )
}