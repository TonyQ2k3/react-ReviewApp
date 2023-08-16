import React from 'react';
import { TouchableOpacity, Appearance } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function InfoButton({func}) {
    return (
        <TouchableOpacity onPress={func}>
            <AntDesign name='infocirlceo' size={24} style={{
                color:  Appearance.getColorScheme() === 'dark' ? '#000000' : '#fff',
            }} />
        </TouchableOpacity>
    )
}

