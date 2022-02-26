import { StyleSheet, Text, View, Image} from 'react-native';
import React, { useState } from 'react';
import { Icon, Input} from '@ui-kitten/components';

const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline'/>
);

const SignUpScreen = () => {

    const [value, setValue] = React.useState('');

    return (
        <View>
            <Image style={styles.header} source={require('../../assets/ChicagoPic1.jpg')}/>
            <Text>Welcome!</Text>
            <Input placeholder='Place your Text' value={value} onChangeText={nextValue => setValue(nextValue)}/>
        </View>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({

    header: {
    height: 200, 
    width: 400,
    },
});