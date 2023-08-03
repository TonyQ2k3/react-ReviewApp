import React from 'react';
import { Text } from 'react-native';
//import { FontAwesomeIcon } from '@expo/vector-icons';

export default function Rating({ value }) {
    let result = '';
    for (let i = 0; i < Math.round(value); i++) {
        result += '★';
    }
    for (let i = 0; i < 5-Math.round(value); i++) {
        result += '☆';
    }
    return (
        <Text style={{fontSize: 18, textAlign: 'center', color: '#fff'}}>Rating: {result}</Text>
    )
}