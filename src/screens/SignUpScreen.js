import { StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React, { useState } from 'react';
import { Input, Text, Button} from '@ui-kitten/components';

import firebase from '../config/firebase';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore";

const SignUpScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);
    
    const onHandleSignup = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password).then(async (response) => {
            const uid = response.user.uid
            const data = {
                id: uid,
                email,
            };
            const usersRef = doc(collection(firebase.firestore(), "users"));
            await setDoc(usersRef, data);
        })
        .then((userRecord) => {
        navigation.navigate('Sign In')
        })
        .catch(err => 
        Alert.alert("You have to fill every field correctly"))
    };


    return (
        <KeyboardAwareScrollView>
            <View style={styles.content}>
                <Image style={styles.header} source={require('../../assets/ChicagoPic1.jpg')}/>
            </View>
            <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false} >
                <View style={styles.content}>
                    <Text style={styles.logoName}  category='h1'>Exploro</Text>
                    <Image style={styles.logo} source={require('../../assets/Exploro.png')}/>
                    <Text style={styles.primaryText}  category='s1'>CREATE AN ACCOUNT</Text>
                    <Input style={styles.inputContainer} status='basic' autoCapitalize='none' placeholder='Email' onChangeText={email => setEmail(email)} />
                    <Input style={styles.inputContainer} status='basic' autoCapitalize='none' placeholder='Password' secureTextEntry={secureTextEntry} onChangeText={password => setPassword(password)} />
                    <View style={styles.buttonBox}>
                        <Button onPress={() => onHandleSignup()} style={styles.buttonColors}>SIGN UP</Button>
                    </View>
                    <Text style={styles.secondaryText}  category='s1'>Have an Account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Sign In')}><Text style={styles.linkColor} category='s1'>Login</Text></TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </KeyboardAwareScrollView>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
    logoName: {
        fontFamily: "Verdana",
        paddingTop: 5,
        paddingBottom: 10,
    },
    primaryText: {
        fontFamily: "Verdana",
        paddingTop: 20,
        paddingBottom: 10,
    },
    logo: {
        height: 100, 
        width: 100,
        paddingTop: 10,
    },
    header: {
        height: 250, 
        width: '90%',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        marginTop: 60,
    },
    secondaryText: {
        fontFamily: "Verdana",
        paddingTop: 60,
        paddingBottom: 10,
    },
    inputContainer: {
        margin: 15,
        borderRadius: 6,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30
    },
    buttonColors: {
        backgroundColor: "#FF9180",
        borderColor: 'transparent',
    },
    buttonBox: {
        paddingTop: 30,
    },
    signInButton: {
        fontFamily: "Verdana",
        backgroundColor: "transparent",
        borderColor: 'transparent',
    },
    linkColor: {
        fontFamily: "Verdana",
        color: "#FF9180",
    },
});