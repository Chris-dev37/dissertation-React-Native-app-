import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';

const CardItem = props => {
    return (
        <View>
            <TouchableOpacity onPress={props.onSelect} style={styles.item}>
                <Image source={{ uri: props.image }} style={styles.image} />
                <View style={styles.infoView}>
                    <Text style={styles.title}>{props.discrip}</Text>
                </View>
            </TouchableOpacity>
            {/* <Button title={'Close'} onPress={props.cardFinish}/> */}
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 25,
        backgroundColor: 'blue',
        borderColor: 'red',
        borderWidth: 1
    },
    infoView: {
        marginLeft: 25,
        width: 250,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    title: {
        color: '#666',
        fontSize: 18,
        marginBottom: 5
    }
})

export default CardItem;