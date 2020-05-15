import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Button, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const CameraFunc = props => {
    const [disValue, setDisValue] = useState();

    const disChangeHandler = text => {
        setDisValue(text);
    }

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if (result.status !== 'granted') {
            Alert.alert(
                'Permission Has Been Denied',
                'Permission Needed To Access Camera',
                [{ text: 'Confirm' }]
            );
            return false;
        }
        return true;
    }

    const takeSnapHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
        });
        props.passData(image.uri, disValue);
        setDisValue('');
        
    }


    return (
        <View>
            <Text>Card Id</Text>
            <TextInput onChangeText={disChangeHandler} value={disValue} />
            <Button title='Snap' onPress={takeSnapHandler} />
            <Button color='green' title='Save Card' onPress={props.modalFinish} />
        </View>
    );
}

export default CameraFunc;
