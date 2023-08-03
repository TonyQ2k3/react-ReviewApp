import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Button, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyles } from '../styles/global';

export default function PostCreate( {route, navigation} ) {
    const [user, setUser] = React.useState('Anonymous');
    const [post, createPost] = React.useState('');

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.container}>
                <View style={styles.nameContainer}>
                    <Text style={{fontSize: 16, color: '#fff'}}>Your name: </Text>
                    <TextInput 
                        style={styles.nameInput}
                        value={user}
                        onChangeText={setUser} />
                </View>
                <Text style={{fontSize: 16, color: '#fff'}}>Your review: </Text>
                <TextInput 
                    multiline 
                    style={styles.postInput}
                    value={post}
                    onChangeText={createPost}
                    />
                <Button title='Submit' onPress={() => {

                }} />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    nameInput: {
        backgroundColor: 'white',
        height: 30,
        width: 200,
        paddingLeft: 10,
    },
    postInput: {
        marginVertical: 20,
        backgroundColor: 'white',
        height: 300,
        padding: 10,
        justifyContent: 'flex-start',
    }
});