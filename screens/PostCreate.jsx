import React from 'react';
import { Text, View, StyleSheet, Button, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import { db, collection, addDoc } from '../firebase/index';


export default function PostCreate( {route, navigation} ) {
    const { movieID } = route.params;

    const addReview = async(myValues) => {
        try {
            const docRef = await addDoc(collection(db, "reviews"), {
                movieID: movieID,
                reviewUser: myValues.user,
                reviewPost: myValues.post
            });
            console.log("Review added written with ID: ", docRef.id);
            Alert.alert('Review added successfully!');
            navigation.goBack();
          } catch (e) {
            console.error("Error adding review: ", e);
          }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.container}>
                <Formik
                    initialValues={{user: '', post: ''}}
                    onSubmit={(values) => {
                        addReview(values);
                    }}
                >
                { 
                    ({handleChange, handleSubmit, values}) => (
                    <View>
                        <View style={styles.nameContainer}>
                            <Text style={{fontSize: 16, color: '#fff'}}>Your name: </Text>
                            <TextInput 
                                style={styles.nameInput}
                                value={values.user}
                                onChangeText={handleChange('user')} />
                        </View>
                        <Text style={{fontSize: 16, color: '#fff'}}>Your review: </Text>
                        <TextInput 
                            multiline 
                            style={styles.postInput}
                            value={values.post}
                            onChangeText={handleChange('post')}
                            />
                        <Button title='Submit' onPress={handleSubmit} />
                    </View>) 
                }
            </Formik>
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