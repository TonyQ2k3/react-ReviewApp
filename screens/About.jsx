import React from 'react';
import { Text, View, ImageBackground, ScrollView } from 'react-native';
import { globalStyles } from '../styles/global';

const info = [
    "\t Welcome to FlixReview, the ultimate destination for movie enthusiasts! We believe that every movie deserves its fair share of applause or critique, and that's why we've created a platform where you can express your opinions and ratings about the movies you love.",
    "\t FlixReview aims to bring together a community of passionate movie buffs, where you can discover new films, explore diverse genres, and engage in lively discussions with fellow cinephiles. Whether you're a casual moviegoer or a dedicated film connoisseur, this app is designed to cater to all your movie-related needs.",
    "\t Remember, your ratings and reviews have the power to shape the movie-watching experience of others, so make your voice heard! Let's come together and celebrate the art of filmmaking, one rating at a time.",
];

export default function About() {
    return (
        <View style={globalStyles.container}>
            <ImageBackground source={require('../assets/main_BG_alt.jpg')} resizeMode='cover' style={{flex: 1}}>
                <ScrollView style={{flex: 1, marginBottom: 20,}}>
                    {info.map((item, index) => (
                        <Text style={globalStyles.paragraph} key={index}>{item}</Text>
                    ))}
                </ScrollView>
            </ImageBackground>
        </View>
    )
}