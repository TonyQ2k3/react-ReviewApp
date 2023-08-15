import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, Image, StatusBar, FlatList, RefreshControl, ImageBackground } from 'react-native';
import { globalStyles } from '../styles/global';
import Rating from '../components/Rating';
import Post from '../components/Post';
import { db, collection, getDocs, getDoc, doc } from '../firebase/index';

const imageBG = 'https://firebasestorage.googleapis.com/v0/b/moviereview-ca8ef.appspot.com/o/main_BG_alt.png?alt=media&token=16ae4c6d-9113-492b-8a3a-1e4bb57cad0a';

export default function ReviewDetails( {route, navigation} ) {
    const { movieTitle, movieRating, moviePoster, movieID } = route.params;
    const [rating, setRating] = useState(movieRating);
    const [reviews, setReviews] = useState([]);
    const [IDs, setIDs] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getReviews = async() => {
        const querySnapshot = await getDocs(collection(db, "reviews"));
        try {
            querySnapshot.forEach((doc) => {
                if (doc.data().movieID == movieID && IDs.indexOf(doc.id) == -1){
                    setReviews( old => [...old, doc.data()]);
                    setIDs(old => [...old, doc.id]);
                }
            });
        } catch (e) {
            console.error("Error fetching data: ", e);
        }
    }

    const updateRating = async() => {
        const docSnap = await getDoc(doc(db, "movies", movieID));
        setRating(docSnap.data().movieRating);
    }

    useEffect(() => {
        getReviews();
    }, []);

    // For refresh control

    const onRefresh = async () => {
        setRefreshing(true);
        await getReviews();
        await updateRating();
        setRefreshing(false);
      };

    return (
        <View style={globalStyles.container}>
            <StatusBar barStyle="light-content" />
            <ImageBackground  source={{uri: imageBG}} resizeMode='cover' style={{flex: 1, paddingBottom: 20,}}>
                <View style={styles.posterContainer}>
                    <Image source={{uri: moviePoster}} style={styles.posterImage} />
                    <View style={styles.titleContainer}>
                        <Text style={globalStyles.titleText}>{movieTitle}</Text>
                        <Rating value={rating} />
                    </View>
                </View>
                <Text style={styles.userReviewText}>User Reviews [{reviews.length}]</Text>
                <FlatList 
                    contentContainerStyle={styles.reviewContainer}
                    data={reviews}
                    renderItem={({item}) => (
                        <Post user={item.reviewUser} content={item.reviewPost} rating={item.reviewRating} />
                    )}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor='white' color='white' />
                    }
                />
                <View style={{paddingHorizontal: 50,}}>
                    <Button title='Create a review' onPress={() => navigation.navigate('PostCreate', {movieID: movieID, revNum: reviews.length})} />
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    posterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 20,
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
    userReviewText: {
        color: '#fff', 
        fontSize: 18, 
        fontFamily: 'nunito-regular', 
        textAlign: 'center', 
        marginBottom: 10,
    },
    reviewText: {
        fontSize: 16,
        color: '#fff',
    },
    reviewContainer: {
        marginVertical: 10,
        borderColor: '#fff',
        alignItems: 'center',
    }
});