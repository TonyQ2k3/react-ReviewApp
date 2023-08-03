import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/global';

export default function About( {route, navigation} ) {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.titleText}>The Review App</Text>
        </View>
    )
}