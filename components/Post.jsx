import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Post({user, content}) {
    return (
        <View>
            <Text>{user}</Text>
            <View>
                <Text>{content}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    nameText: {

    },
    contentContainer: {

    },
    contentText: {
        
    },
});