import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image, ImageBackground, StatusBar } from 'react-native';
import { db, collection, addDoc, getDocs } from '../firebase/index';

const imageBG = require('../assets/mainBG.png');

export default function Home( {route, navigation} ) {
    const [movies, setMovies] = useState([]);

    const getMovies = async() => {
        const querySnapshot = await getDocs(collection(db, "movies"));
        querySnapshot.forEach((doc) => {
            setMovies(old => [...old, {...doc.data()}]);
        });
    }

    useEffect(() => {
        getMovies();
    }, [])

    return (
        <View style={styles.homeContainer}>
            <StatusBar barStyle="light-content" />
            <ImageBackground source={imageBG} resizeMode='cover' style={styles.imageBG}>
                <FlatList
                    contentContainerStyle={styles.listContainer} 
                    data={movies}
                    keyExtractor={(item) => item.movieID}
                    renderItem={({item}) => (
                        <TouchableOpacity style={styles.movieContainer} onPress={() => navigation.navigate('Details', item)}>
                            <Image source={{uri: item.moviePoster}} style={styles.moviePoster} />
                            <Text style={styles.movieTitle}>{item.movieTitle}</Text>
                        </TouchableOpacity>
                    )} 
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
        height: 250,
        borderRadius: 10,
    },
    movieTitle: {
        textAlign: 'center',
        fontSize: 16,
        color: '#fff'
    },
});
