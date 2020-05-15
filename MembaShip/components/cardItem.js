import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';

const CardItem = props => {

    const deleteCardAlert = (image, id) => {
        Alert.alert(
            'Delete Card',
            'Are you sure want to delete this card?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => props.deleteCard(image, id) },
            ],
            { cancelable: false }
        )
    }

    const displayPickedCard = (pickedImage, pickedId) => {
        props.onSelect(pickedImage, pickedId);
    }

    return (
        <View>
            <TouchableOpacity onPress={() => displayPickedCard(props.image, props.discrip)} style={styles.item}>
                <Image source={{ uri: props.image }} style={styles.image} />
                <View style={styles.infoView}>
                    <Text style={styles.title}>{props.discrip}</Text>
                </View>
            </TouchableOpacity>
            <Button title='^^Delete^^' color='red' onPress={() => deleteCardAlert(props.image, props.discrip)} />
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