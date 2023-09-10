import React from "react";
import { TouchableOpacity, ImageBackground, Text, StyleSheet } from "react-native";


export default function Title({navigation}) {
    return (
        <ImageBackground source={require('../assets/title.jpg')} resizeMode='cover' style={{flex: 1, alignItems: 'center'}}>
            <TouchableOpacity style={styles.exploreBtn} onPress={() => navigation.replace('Home')}>
                <Text style={{color: '#fff', fontSize: 20}}>Explore</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    exploreBtn: {
        width: 175,
        margin: 20,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#282ddb',
        borderRadius: 25,
        position: "absolute",
        bottom: 50,
    }
});