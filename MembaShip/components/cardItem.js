import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';

const CardItem = props => {

    const deleteCardAlert = (image, id) => { // Here when the user has selected to delete a card from the app an alert will pop on screen asking if the user is sure. If 'OK' is pressed, the parameters pasted to this function is then passed back to 'App.js' through a prop
        Alert.alert(
            'Delete Card',
            'Are you sure want to delete this card?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => props.deleteCard(image, id) },
            ],
            { cancelable: false }
        )
    }

    const displayPickedCard = (pickedImage, pickedId) => {
        props.onSelect(pickedImage, pickedId); // Here when a item in the flatlist is pressed the image uri and id is passed back to 'App.js' through a prop and then past into a function that stores them into cosnt's that are then used in the modal for displaying them
    }

    return (
        <View>
            <TouchableOpacity onPress={() => displayPickedCard(props.image, props.discrip)} style={styles.item}>
                <Image source={{ uri: props.image }} style={styles.image} />
                <View style={styles.infoView}>
                    <Text style={styles.title}>{props.discrip}</Text>
                    <View style={styles.deleteBtn}>
                        <Button style={styles.btn} title='Delete Card' color='red' onPress={() => deleteCardAlert(props.image, props.discrip)} />
                    </View>
                </View>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        borderBottomColor: '#ccc',
        paddingVertical: 25,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',

    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 25,
        backgroundColor: 'blue',
        borderColor: '#ff8c00',
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
        fontSize: 22,
        marginBottom: 5,
        color: 'black'
    },
    deleteBtn: {
        paddingLeft: 20,
        alignSelf: 'center'
    }
})

export default CardItem;