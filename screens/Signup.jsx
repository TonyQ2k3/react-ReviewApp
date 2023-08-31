import React, { useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import { auth, createUserWithEmailAndPassword, updateProfile } from '../firebase/index';
import * as yup from 'yup';

const imageBG = 'https://firebasestorage.googleapis.com/v0/b/moviereview-ca8ef.appspot.com/o/main_BG_alt.png?alt=media&token=16ae4c6d-9113-492b-8a3a-1e4bb57cad0a';

const SignUpSchema = yup.object({
    username: yup.string()
    .label('Username')
    .required(),
    email: yup.string()
    .label('Email')
    .required(),
    password: yup.string()
    .label('Password')
    .required(),
});


export default function Signup({route, navigation}) {
    const handleSignUp = (values) => {
        createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
            updateProfile(auth.currentUser, {
                displayName: values.username,
            });
            Alert.alert('User registered successfully!');
            navigation.navigate('Home');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`Error ${errorCode}: ${errorMessage}`);
        });
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.container}>
                <Formik
                    initialValues={{email: '', password: '', username: ''}}
                    validationSchema={SignUpSchema}
                    onSubmit={(values) => {
                        handleSignUp(values);
                    }}
                >
                {
                    ({handleChange, handleSubmit, values, errors}) => (
                    <ImageBackground source={{uri: imageBG}} resizeMode='cover' style={{flex: 1, padding: 20}}>
                        <Text style={styles.title}>Sign up</Text>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Username</Text>
                            <TextInput 
                                style={styles.input}
                                value={values.username}
                                onChangeText={handleChange('username')}
                            />
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput 
                                style={styles.input}
                                value={values.email}
                                onChangeText={handleChange('email')}
                            />
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput 
                                style={styles.input}
                                secureTextEntry
                                value={values.password}
                                onChangeText={handleChange('password')}
                            />
                        </View>
                        <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                            <Text style={{color: '#fff', fontSize: 20,}}>Sign up</Text>
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
        paddingHorizontal: 20,
        paddingVertical: 10,
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