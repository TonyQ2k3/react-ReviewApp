import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image, ImageBackground, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const imageBG = require('../assets/mainBG.png');

export default function Home( {route, navigation} ) {
    const insets = useSafeAreaInsets();
    const [reviews, setReviews] = React.useState([
        { title: 'The Flash', rating: 3, key: '1', poster: require('../assets/posters/TheFlash.png')},
        { title: 'Spiderman: Across The Spider-verse', rating: 5, key: '2', poster: require('../assets/posters/ATSV.png')},
        { title: 'Mission Impossible 7', rating: 4, key: '3', poster: require('../assets/posters/MI7.png')},
    ]);

    return (
        <View style={styles.homeContainer}>
            <StatusBar barStyle="light-content" />
            <ImageBackground source={imageBG} resizeMode='cover' style={styles.imageBG}>
                <FlatList
                    contentContainerStyle={styles.listContainer} 
                    data={reviews}
                    renderItem={({item}) => (
                        <TouchableOpacity style={styles.movieContainer} onPress={() => navigation.navigate('Details', item)}>
                            <Image source={item.poster} style={styles.moviePoster} />
                            <Text style={styles.movieTitle}>{item.title}</Text>
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
