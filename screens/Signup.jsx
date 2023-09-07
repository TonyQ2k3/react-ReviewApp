import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, ImageBackground, Alert } from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import { auth, createUserWithEmailAndPassword, updateProfile } from '../firebase/index';
import * as yup from 'yup';


const SignUpSchema = yup.object({
    username: yup.string()
    .label('Username')
    .min(5)
    .required(),
    email: yup.string().email()
    .label('Email')
    .required(),
    password: yup.string()
    .label('Password')
    .min(6)
    .required(),
});


export default function Signup({navigation}) {
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
            Alert.alert("Registrations failed", "There's an error that's preventing you from creating the account. Please try again.");
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
                    <ImageBackground source={require('../assets/main_BG_alt.png')} resizeMode='cover' style={{flex: 1, padding: 20}}>
                        <Text style={styles.title}>Sign up</Text>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Username</Text>
                            <TextInput 
                                style={styles.input}
                                value={values.username}
                                onChangeText={handleChange('username')}
                            />
                            <Text style={globalStyles.errorText}>{errors.username}</Text>
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput 
                                style={styles.input}
                                value={values.email}
                                onChangeText={handleChange('email')}
                            />
                            <Text style={globalStyles.errorText}>{errors.email}</Text>
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput 
                                style={styles.input}
                                secureTextEntry
                                value={values.password}
                                onChangeText={handleChange('password')}
                            />
                            <Text style={globalStyles.errorText}>{errors.password}</Text>
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