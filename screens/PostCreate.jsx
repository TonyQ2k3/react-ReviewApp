import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput, TouchableWithoutFeedback, Keyboard, Alert, ImageBackground } from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import { db, collection, addDoc, setDoc, doc, getDoc } from '../firebase/index';
import { AirbnbRating } from 'react-native-ratings';
import * as yup from 'yup';

const imageBG = 'https://firebasestorage.googleapis.com/v0/b/moviereview-ca8ef.appspot.com/o/main_BG_alt.png?alt=media&token=16ae4c6d-9113-492b-8a3a-1e4bb57cad0a';

const reviewSchema = yup.object({
    post: yup.string()
    .label('Review article')
    .required()
    .min(5),
});

export default function PostCreate( {route, navigation} ) {
    const { movieID, revNum, userName } = route.params;
    const [rating, setRating] = useState(3);

    const updateRating = async() => {
        const docRef = doc(db, "movies", movieID);
        const docSnap = await getDoc(docRef);
        const oldRating = docSnap.data().movieRating;

        setDoc(docRef, { 
            movieRating: parseInt((rating + oldRating) / (revNum + 1)),
        }, { merge: true });
    }

    const addReview = async(myValues) => {
        try {
            const docRef = await addDoc(collection(db, "reviews"), {
                movieID: movieID,
                reviewUser: userName,
                reviewPost: myValues.post,
                reviewRating: rating,
            });
            console.log("Review added written with ID: ", docRef.id);
            Alert.alert('Review added successfully!');
            // Update movie rating
            updateRating();

            navigation.goBack();
          } catch (e) {
            console.error("Error adding review: ", e);
          }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.container}>
                <Formik
                    initialValues={{post: ''}}
                    validationSchema={reviewSchema}
                    onSubmit={(values) => {
                        addReview(values);
                    }}
                >
                { 
                    ({handleChange, handleSubmit, values, errors}) => (
                    <ImageBackground source={{uri: imageBG}} resizeMode='cover' style={{flex: 1, padding: 20}}>
                        {/* Rating Input */}
                        <View style={styles.ratingContainer}>
                            <AirbnbRating
                            count={5}
                            reviews={["Terrible", "Bad", "Good", "Very Good", "Amazing"]}
                            selectedColor='#fff'
                            unSelectedColor='#3f3f3f'
                            defaultRating={3}
                            size={20}
                            reviewColor='#fff'
                            onFinishRating={(val) => setRating(val)}
                            />
                        </View>

                        {/* Review Input */}
                        <View style={{marginBottom: 10,}}>
                            <Text style={{fontSize: 18, color: '#fff'}}>Your review: </Text>
                            <TextInput 
                                multiline
                                style={styles.postInput}
                                value={values.post}
                                onChangeText={handleChange('post')}
                                />
                            <Text style={styles.errorText}>{errors.post}</Text>
                        </View>
                        <Button title='Submit' onPress={handleSubmit} />
                    </ImageBackground>) 
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
        color: '#fff',
        height: 30,
        width: 250,
        paddingLeft: 10,
        borderBottomColor: '#fff',
        borderBottomWidth: 2,
    },
    ratingContainer: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    postInput: {
        color: '#fff',
        marginVertical: 10,
        fontSize: 16,
        maxHeight: 300,
        padding: 10,
        borderRadius: 5,
        borderBottomColor: '#fff',
        borderBottomWidth: 2,
    },
    errorText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});