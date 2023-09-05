import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    containerPrompt: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'space-between',
    },
    titleText: {
        fontSize: 20,
        color: '#fff',   
        textAlign: 'center',  
        marginBottom: 10,
    },
    paragraph: {
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 5,
        lineHeight: 22,
        color: '#fff',
        fontSize: 18,
    },
    submitBtn: {
        minWidth: 200,
        margin: 20,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D94848',
        borderRadius: 25,
    },
});