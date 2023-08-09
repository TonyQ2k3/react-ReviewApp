import React from 'react';
import { Text, View, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { globalStyles } from '../styles/global';

const imageBG = 'https://firebasestorage.googleapis.com/v0/b/moviereview-ca8ef.appspot.com/o/main_BG_alt.png?alt=media&token=16ae4c6d-9113-492b-8a3a-1e4bb57cad0a';

const info = [
    "\t Welcome to FlixReview, the ultimate destination for movie enthusiasts! We believe that every movie deserves its fair share of applause or critique, and that's why we've created a platform where you can express your opinions and ratings about the movies you love.",
    "\t FlixReview aims to bring together a community of passionate movie buffs, where you can discover new films, explore diverse genres, and engage in lively discussions with fellow cinephiles. Whether you're a casual moviegoer or a dedicated film connoisseur, this app is designed to cater to all your movie-related needs.",
    "\t With our user-friendly interface, you'll be able to rate movies, provide detailed reviews, and share your thoughts with others. We encourage constructive and insightful discussions, as we believe that different opinions contribute to a richer cinematic experience.",
    "\t So, join us on this cinematic journey as we celebrate the magic of storytelling on the silver screen. Experience the thrill of discovering hidden gems, engage in friendly debates, and find your next favorite film with FlixReview.",
    "\t Remember, your ratings and reviews have the power to shape the movie-watching experience of others, so make your voice heard! Let's come together and celebrate the art of filmmaking, one rating at a time.",
];

export default function About( {route, navigation} ) {
    return (
        <View style={globalStyles.container}>
            <ImageBackground source={{uri: imageBG}} resizeMode='cover' style={{flex: 1}}>
                <ScrollView style={{flex: 1, marginBottom: 20,}}>
                    {info.map((item, index) => (
                        <Text style={globalStyles.paragraph} key={index}>{item}</Text>
                    ))}
                </ScrollView>
            </ImageBackground>
        </View>
    )
}