import React from 'react';
import { Text, View, StyleSheet, Button, Image, StatusBar } from 'react-native';
import { globalStyles } from '../styles/global';
import Rating from '../components/Rating';

export default function ReviewDetails( {route, navigation} ) {
    const { title, rating, poster } = route.params;
    return (
        <View style={globalStyles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.posterContainer}>
                <Image source={poster} style={styles.posterImage} />
                <View style={styles.titleContainer}>
                    <Text style={globalStyles.titleText}>{title}</Text>
                    <Rating value={rating} />
                </View>
            </View>
            <View style={styles.reviewContainer}>
                
            </View>
            <Button title='Create a review' onPress={() => navigation.navigate('PostCreate')} />
        </View>
    )
}

const styles = StyleSheet.create({
    posterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    posterImage: {
        width: 100, 
        height: 125, 
        marginRight: 5,
        borderRadius: 10,
    },
    titleContainer: {
        flex: 2,
    },
    reviewText: {
        fontSize: 16,
        color: '#fff',
    },
    reviewContainer: {
        marginVertical: 10,
        flex: 1,
        alignItems: 'center',
    }
});