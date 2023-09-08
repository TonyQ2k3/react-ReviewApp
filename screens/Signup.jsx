import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, ImageBackground, Alert } from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import { auth, createUserWithEmailAndPassword, updateProfile } from '../firebase/index';
import * as yup from 'yup';

// Import icons
import { MaterialCommunityIcons } from '@expo/vector-icons';


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
    confirmPass: yup.string()
    .label('Password confirmation')
    .required()
    .oneOf([yup.ref('password')], 'Your passwords do not match.')
});


export default function Signup({navigation}) {
    const handleSignUp = (values) => {
        createUserWithEmailAndPassword(auth, values.email, values.password)
        .then(() => {
            updateProfile(auth.currentUser, {
                displayName: values.username,
            });
            Alert.alert('User registered successfully!');
            navigation.navigate('Home');
        })
        .catch(() => {
            Alert.alert("Registrations failed", "There's an error that's preventing you from creating the account. Please try again.");
        });
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={globalStyles.container}>
                <Formik
                    initialValues={{username: '', email: '', password: '', confirmPass: ''}}
                    validationSchema={SignUpSchema}
                    onSubmit={(values) => {
                        handleSignUp(values);
                    }}
                >
                {
                    ({handleChange, handleSubmit, values, errors}) => (
                    <ImageBackground source={require('../assets/main_BG_alt.jpg')} resizeMode='cover' style={{flex: 1, padding: 20}}>
                        <Text style={styles.title}>Sign up</Text>
                        <View style={globalStyles.form_inputWrapper}>
                            <MaterialCommunityIcons name='account-circle' style={globalStyles.form_label} size={24}/>
                            <View>
                                <TextInput
                                    placeholder='Username' 
                                    style={globalStyles.form_input}
                                    value={values.username}
                                    onChangeText={handleChange('username')}
                                />
                                <Text style={globalStyles.errorText}>{errors.username}</Text>
                            </View>
                        </View>
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
                                    secureTextEntry
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                />
                                <Text style={globalStyles.errorText}>{errors.password}</Text>
                            </View>
                        </View>
                        <View style={globalStyles.form_inputWrapper}>
                            <MaterialCommunityIcons name='lock' style={globalStyles.form_label} size={24}/>
                            <View>
                                <TextInput 
                                    placeholder='Confirm Password'
                                    style={globalStyles.form_input}
                                    secureTextEntry
                                    value={values.confirmPass}
                                    onChangeText={handleChange('confirmPass')}
                                />
                                <Text style={globalStyles.errorText}>{errors.confirmPass}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={globalStyles.submitBtn} onPress={handleSubmit}>
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
});