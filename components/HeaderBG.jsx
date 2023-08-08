import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function HeaderBG() {
    return (
        <Image
            style={StyleSheet.absoluteFill}
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/moviereview-ca8ef.appspot.com/o/header.png?alt=media&token=ade06e02-6fa8-42cc-8376-02ef8151eeaa' }}
        />
    )
}