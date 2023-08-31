import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import { db, collection, addDoc, setDoc, doc, getDoc } from '../firebase/index';
import * as yup from 'yup';

const imageBG = 'https://firebasestorage.googleapis.com/v0/b/moviereview-ca8ef.appspot.com/o/main_BG_alt.png?alt=media&token=16ae4c6d-9113-492b-8a3a-1e4bb57cad0a';

export default function Signup({route, navigation}) {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.container}>
                <Formik
                    initialValues={{username: '', email: '', password: ''}}
                >
                {
                    () => (
                    <ImageBackground source={{uri: imageBG}} resizeMode='cover' style={{flex: 1, padding: 20}}>
                        <Text style={styles.title}>Sign up</Text>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Username</Text>
                            <TextInput 
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput 
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput 
                                style={styles.input}
                                secureTextEntry
                            />
                        </View>
                        <TouchableOpacity style={styles.submit}>
                            <Text style={{color: '#fff', fontSize: 20,}}>Submit</Text>
                        </TouchableOpacity>
                    </ImageBackground>)
                }
                </Formik>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        textAlign: 'center',
        color: '#fff',
    },
    inputWrapper: {
        padding: 20,
    },
    label: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    submit: {
        margin: 20,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D94848',
        borderRadius: 25,
    },
});