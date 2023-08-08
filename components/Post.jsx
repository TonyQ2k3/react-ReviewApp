import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Post({user, content}) {
    return (
        <View style={styles.postContainer}>
            <Text style={styles.user}>{user}</Text>
            <View style={styles.contentWrapper}>
                <Text style={styles.content}>{content}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: '#F34C56',
        width: 325,
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
    },
    user: {
        color: 'white',
        fontSize: 18,
    },
    contentWrapper: {
        marginTop: 10,
    },
    content: {
        color: 'white',
        fontSize: 16,
    },
});