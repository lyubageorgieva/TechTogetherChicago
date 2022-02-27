import React from 'react';
import { StyleSheet, Text } from 'react-native';

const ErrorAlert = ({ error, visible }) => {
    if (!error || !visible) {
        return null;
    }

    return <Text style={styles.errorText}>⚠️ {error}</Text>;
};

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        fontSize: 20,
        marginBottom: 10,
        fontWeight: '600'
    }
});

export default ErrorAlert;