import React, { useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import { auth, signInWithEmailAndPassword, onAuthStateChanged } from '../firebase/index';
import * as yup from 'yup';

const imageBG = 'https://firebasestorage.googleapis.com/v0/b/moviereview-ca8ef.appspot.com/o/main_BG_alt.png?alt=media&token=16ae4c6d-9113-492b-8a3a-1e4bb57cad0a';

const LoginSchema = yup.object({
    email: yup.string()
    .label('Email')
    .required(),
    password: yup.string()
    .label('Password')
    .required(),
});

export default function Login({route, navigation}) {
    const handleLogin = (values) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`Error ${errorCode}: ${errorMessage}`);
        });
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                console.log('User has logged in with uid ', user.uid);
                navigation.navigate('Home');
            }
        })
    }, []);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.container}>
                <Formik
                    initialValues={{email: '', password: ''}}
                    validationSchema={LoginSchema}
                    onSubmit={(values) => {
                        handleLogin(values);
                    }}
                >
                {
                    ({handleChange, handleSubmit, values, errors}) => (
                    <ImageBackground source={{uri: imageBG}} resizeMode='cover' style={{flex: 1, padding: 20}}>
                        <Text style={styles.title}>Login</Text>
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
                                value={values.password}
                                onChangeText={handleChange('password')}
                                secureTextEntry
                            />
                        </View>
                        <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                            <Text style={{color: '#fff', fontSize: 20,}}>Login</Text>
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