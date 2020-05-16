import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Button, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const CameraFunc = props => {
    const [disValue, setDisValue] = useState(''); // Hook used to handle the state of the 'TextInput' component

    const disChangeHandler = text => {
        setDisValue(text); // Here the function is called when the TextInput text has changed and the text is passed to the const 'disValue'
    }

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL); // Here Permission for access to the platform camera and camera roll. This is only require for IOS as Android handles this automatically
        if (result.status !== 'granted') {
            Alert.alert(
                'Permission Has Been Denied', // If permission isnt granted then an alert pops up to notify the user
                'Permission Needed To Access Camera',
                [{ text: 'Confirm' }]
            );
            return false;
        }
        return true;
    }

    const takeSnapHandler = async () => {
        const hasPermission = await verifyPermissions(); // Here this fuction is called when the 'Take Picture' button is pressed which then calls the permission function above. If that function returns true then the value of the TextInput is checked, if its empty then an alert notifies the user and the function ends there
        if (!hasPermission) {
            return;
        }
        if (disValue === '') {
            Alert.alert(
                'No Card Id',
                'Please Add An Identifier Above',
                [{ text: 'Confirm' }]
            );
            return;
        }
        const image = await ImagePicker.launchCameraAsync({ // if the TextInput isnt empty then the camera is launched and the picture thats camptures is stored in the image const. 'allowsEditing' is set to true to allow the user to crop the image. Android platforms can also flip the image from this setting. 
            allowsEditing: true,
        });
        props.passData(image.uri, disValue); // The uri prop of the image const along with the value of the TextInput is passed to the 'App.js' to be stored in the 'allCaptures' array for use in the flatlist component 
        setDisValue(''); // The TextInput field is reset so its empty when the next card is entered 
        props.modalFinish(false); // This closes the modal after the picture is taken by sending false through a prop which is then used in a function to change the modals 'isVisable' prop
    }




    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.centerScreen}>
                <Text style={styles.header}>Card Id</Text>
                <TextInput style={styles.textField} placeholder={'E.g Company Name'} onChangeText={disChangeHandler} value={disValue} />
                <View style={styles.btnSpace}>
                    <Button title='Take Picture' color='#ff8c00' onPress={takeSnapHandler} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    centerScreen: {
        marginTop: 100

    },
    header: {
        alignSelf: 'center',
        fontSize: 22,
    },
    textField: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 2,
        alignSelf: 'center'
    },
    btnSpace: {
        padding: 15,
        alignItems: 'center'
    }

});

export default CameraFunc;
