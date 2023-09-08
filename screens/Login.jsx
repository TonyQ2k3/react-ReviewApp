import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, ImageBackground, Alert } from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import { auth, signInWithEmailAndPassword} from '../firebase/index';
import * as yup from 'yup';

// Import icons
import { MaterialCommunityIcons } from '@expo/vector-icons';


const LoginSchema = yup.object({
    email: yup.string().email()
    .label('Email')
    .required(),
    password: yup.string()
    .label('Password')
    .min(6)
    .required(),
});

export default function Login({navigation}) {
    const handleLogin = (values) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
        .then(() => {
            navigation.navigate('Home');
        })
        .catch(() => {
            Alert.alert("Login failed", "The email address or password that you've entered doesn't match any account. Please try again.");
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
                        <View style={globalStyles.form_inputWrapper}>
                            <MaterialCommunityIcons name='email' style={globalStyles.form_label} size={24}/>
                            <View>
                                <TextInput
                                    placeholder='Email' 
                                    style={globalStyles.form_input}
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                />
                                <Text style={globalStyles.errorText}>{errors.email}</Text>
                            </View>
                        </View>
                        <View style={globalStyles.form_inputWrapper}>
                            <MaterialCommunityIcons name='lock' style={globalStyles.form_label} size={24}/>
                            <View>
                                <TextInput 
                                    placeholder='Password'
                                    style={globalStyles.form_input}
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    secureTextEntry
                                />
                                <Text style={globalStyles.errorText}>{errors.password}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={globalStyles.submitBtn} onPress={handleSubmit}>
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
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    label: {
        color: '#D94848',
        backgroundColor: '#fff',
        padding: 8,
        position: 'relative',
        top: -10,
        left: 0,
        borderRadius: 5,
        height: 40,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 18,
        width: 300,
        height: 40,
        position: 'relative',
        left: -8,
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