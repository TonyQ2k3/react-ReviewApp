import React from 'react';
import { TouchableOpacity, Appearance } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function InfoButton({type, func}) {
    return (
        <TouchableOpacity onPress={func}>
            <MaterialCommunityIcons name={type} size={25} style={{
                color:  Appearance.getColorScheme() === 'dark' ? '#000000' : '#fff',
            }} />
        </TouchableOpacity>
    )
}

