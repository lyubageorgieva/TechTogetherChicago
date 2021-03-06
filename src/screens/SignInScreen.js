import { StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React, { useState } from 'react';
import { Input, Text, Button} from '@ui-kitten/components';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignInScreen = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    const onLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate('Profile')
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error)
    });
    }

    return (
        <KeyboardAwareScrollView>
            <View style={styles.content}>
                <Image style={styles.header} source={require('../../assets/Chicago4.jpg')}/>
            </View>
            <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false} >
                <View style={styles.content}>
                    <Text style={styles.logoName}  category='h1'>Exploro</Text>
                    <Image style={styles.logo} source={require('../../assets/Exploro.png')}/>
                    <Text style={styles.primaryText}  category='s1'>LOGIN</Text>
                    <Input style={styles.inputContainer} status='basic' autoCapitalize='none' placeholder='Email' onChangeText={email => setEmail(email)} />
                    <Input style={styles.inputContainer} status='basic' autoCapitalize='none' placeholder='Password' secureTextEntry={secureTextEntry} onChangeText={password => setPassword(password)} />
                    <View style={styles.buttonBox}>
                        <Button onPress={onLogin} style={styles.buttonColors}>LOGIN</Button>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </KeyboardAwareScrollView>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
    logo: {
        height: 100, 
        width: 100,
        paddingTop: 10,
    },
    logoName: {
        fontFamily: "Verdana",
        paddingTop: 5,
        paddingBottom: 10,
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
    primaryText: {
        fontFamily: "Verdana",
        paddingTop: 20,
        paddingBottom: 10,
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