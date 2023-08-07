import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, Image, StatusBar, FlatList } from 'react-native';
import { globalStyles } from '../styles/global';
import Rating from '../components/Rating';
import Post from '../components/Post';
import { app, db, getFirestore, collection, addDoc, getDocs } from '../firebase/index';


export default function ReviewDetails( {route, navigation} ) {
    const { movieTitle, movieRating, moviePoster, movieID } = route.params;
    const [reviews, setReviews] = useState([]);

    const getReviews = async() => {
        const querySnapshot = await getDocs(collection(db, "reviews"));
        querySnapshot.forEach((doc) => {
            if (doc.data().movieID == movieID){
                setReviews( old => [...old, doc.data()]);
            }
        });
    }

    useEffect(() => {
        getReviews();
    }, []);

    return (
        <View style={globalStyles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.posterContainer}>
                <Image source={{uri: moviePoster}} style={styles.posterImage} />
                <View style={styles.titleContainer}>
                    <Text style={globalStyles.titleText}>{movieTitle}</Text>
                    <Rating value={movieRating} />
                </View>
            </View>
            <Text style={{color: '#fff', fontSize: 18, fontFamily: 'nunito-regular', textAlign: 'center', marginBottom: 10,}}>User Reviews</Text>
            <FlatList 
                contentContainerStyle={styles.reviewContainer}
                data={reviews}
                renderItem={({item}) => (
                    <Post user={item.reviewUser} content={item.reviewPost} />
                )}
            />
            <Button title='Create a review' onPress={() => navigation.navigate('PostCreate', {movieID: movieID})} />
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
        borderColor: '#fff',
        //flex: 1,
        alignItems: 'center',
    }
});