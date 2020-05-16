import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Here the title and greet props from 'Header' component are passed here and displayed as text components
const Header = props => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{props.title}</Text>
            <Text style={styles.headerText}>{props.greet}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 100,
        padding: 36,
        backgroundColor: '#ff8c00',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40
    },
    headerText: {
        color: 'black',
        fontSize: 18
    }
});

export default Header;