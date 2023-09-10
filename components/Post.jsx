import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Rating from './Rating';

export default function Post({user, content, rating = 0}) {
    return (
        <View style={styles.postContainer}>
            <View style={styles.postHeader}>
                <Text style={styles.user}>{user}</Text>
                <Rating value={rating} withText={false} />
            </View>
            <View style={styles.contentWrapper}>
                <Text style={styles.content}>{content}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: '#2b2a57',
        width: 325,
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    user: {
        color: 'white',
        fontSize: 16,
        maxWidth: '50%',
    },
    contentWrapper: {
        marginTop: 10,
    },
    content: {
        color: 'white',
        fontSize: 16,
    },
});