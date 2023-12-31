import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ImageBackground, StatusBar, RefreshControl } from 'react-native';
import { db, collection, getDocs } from '../firebase/index';
import MovieCard from '../components/MovieCard';

export default function Home( {navigation} ) {
    const [refreshing, setRefreshing] = useState(false);
    const [movies, setMovies] = useState([]);
    const [IDs, setIDs] = useState([]);

    const getMovies = async() => {
        const querySnapshot = await getDocs(collection(db, "movies"));
        querySnapshot.forEach((doc) => {
            if (IDs.indexOf(doc.data().movieID) === -1) {
                setMovies(old => [...old, {
                    movieID: doc.id,
                    movieTitle: doc.data().movieTitle,
                    moviePoster: doc.data().moviePoster,
                    movieRating: doc.data().movieRating, 
                    movieYear: doc.data().movieYear,
                }]);
                setIDs(old => [...old, doc.data().movieID]);
            }
        });
    }

    useEffect(() => {
        getMovies();
    }, []);

    // For refresh control

    const onRefresh = React.useCallback(async() => {
        setRefreshing(true);
        setIDs([]);
        setMovies([]);
        await getMovies();
        setRefreshing(false);
    }, []);


    return (
        <View style={styles.homeContainer}>
            <StatusBar barStyle="light-content" />
            <ImageBackground source={require('../assets/main_BG.jpg')} resizeMode='cover' style={styles.imageBG}>
                <FlatList
                    contentContainerStyle={styles.listContainer} 
                    data={movies}
                    keyExtractor={(item) => item.movieID}
                    renderItem={({item}) => (
                        <MovieCard info={item} pressHandler={() => navigation.navigate('Details', item)} />
                    )}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor='white' color='white' />
                    } 
                />
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        backgroundColor: '#000000',
    },
    navButton: {
        marginTop: 10,
    },
    buttonContainer: {
        marginVertical: 15,
    },
    imageBG: {
        flex: 1,
    },
    listContainer: {
        marginTop: 10,
        alignItems: "center",
    },
    itemTitle: {
        fontSize: 18,
    },
    movieContainer: {
        alignItems: 'center',
        width: 200,
        marginBottom: 15,
    },
    moviePoster: {
        width: 200,
        height: 305,
        borderRadius: 10,
    },
    movieTitle: {
        textAlign: 'center',
        fontSize: 16,
        color: '#fff'
    },
});
