import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import { auth, signInWithEmailAndPassword} from '../firebase/index';
import * as yup from 'yup';


const LoginSchema = yup.object({
    email: yup.string()
    .label('Email')
    .required(),
    password: yup.string()
    .label('Password')
    .required(),
});

export default function Login({navigation}) {
    const handleLogin = (values) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
        .then(() => {
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
            <ImageBackground source={require('../assets/main_BG_alt.png')} style={globalStyles.containerPrompt}>
                <Formik
                    initialValues={{email: '', password: ''}}
                    validationSchema={LoginSchema}
                    onSubmit={(values) => {
                        handleLogin(values);
                    }}
                >
                {
                    ({handleChange, handleSubmit, values, errors}) => (
                    <View style={{padding: 20, paddingBottom: 0}}>
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
                    </View>)
                }
                </Formik>
                <View style={{margin: 20,}}>
                    <Text style={styles.bottomText}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.replace('Signup')}>
                        <Text style={styles.bottomTextBold}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
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
    bottomText: {
        color: '#fff', 
        fontSize: 18, 
        textAlign: 'center'
    },
    bottomTextBold: {
        color: '#fff', 
        fontSize: 18, 
        textAlign: 'center',
        fontWeight: 'bold',
    }
});