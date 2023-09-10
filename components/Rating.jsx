import React from 'react';
import { Text } from 'react-native';

export default function Rating({ value, withText = true }) {
    let result = '';
    for (let i = 0; i < Math.round(value); i++) {
        result += '★';
    }
    for (let i = 0; i < 5-Math.round(value); i++) {
        result += '☆';
    }
    return (
        <Text style={{fontSize: 18, textAlign: 'center', color: '#fff', borderWidth: 0, borderColor: '#fff'}}>
            {withText ? "Rating: " + result : result}
        </Text>
    )
}

