import { StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React, { useState } from 'react';
import { Input, Text, Button} from '@ui-kitten/components';


const SignUpScreen = ({ navigation }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    return (
        <KeyboardAwareScrollView>
            <Image style={styles.header} source={require('../../assets/ChicagoPic1.jpg')}/>
            <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false} >
                <View style={styles.content}>
                    <Text style={styles.primaryText}  category='h5'>CREATE AN ACCOUNT</Text>
                    <Input style={styles.inputContainer} status='basic' autoCapitalize='none' placeholder='Username' onChangeText={username => setUsername(username)} />
                    <Input style={styles.inputContainer} status='basic' autoCapitalize='none' placeholder='Password' secureTextEntry={secureTextEntry} onChangeText={password => setPassword(password)} />
                    <View style={styles.buttonBox}>
                        <Button style={styles.buttonColors}>SIGN UP</Button>
                    </View>
                    <Text style={styles.secondaryText}  category='s2'>Have an Account? </Text>
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
    header: {
        height: 250, 
        width: '100%',
    },
    primaryText: {
        fontFamily: "Verdana",
        paddingTop: 20,
        paddingBottom: 30,
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
        backgroundColor: "#FFA78C",
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