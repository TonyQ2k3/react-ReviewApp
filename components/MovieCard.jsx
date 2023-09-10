import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import Rating from './Rating';
import { globalStyles } from '../styles/global';

export default function MovieCard({info, pressHandler}) {
    return (
        <TouchableOpacity style={globalStyles.movieContainer} onPress={pressHandler}>
            <Image source={{uri: info.moviePoster}} style={globalStyles.moviePoster} />
            <View style={globalStyles.movieInfoContainer}>
                <Text style={globalStyles.movieTitle}>{info.movieTitle}</Text>
                <Text style={globalStyles.movieYear}>{info.movieYear}</Text>
                <Rating value={info.movieRating} withText={false} />
            </View>
        </TouchableOpacity>
    )
}