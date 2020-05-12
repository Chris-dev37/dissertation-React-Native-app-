import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import { Camera } from 'expo-camera';

const CameraFunc = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />
    }

    if (hasPermission === false) {
        Alert.alert(
            "Oh NO",
            "No Camera Permission Granted",
            [{
                text: "Grant Permission",
                onPress: () => setHasPermission(true)
            },
            {
                text: "Cancel",
                onPress: () => console.log("Canceled Permissions")
            }
            ],
            {
                cancelable: false
            }
        );
    }

    return (
        <View style={styles.camLayout}>
            <Camera type={type}>
                <View>
                    <TouchableOpacity onPress={() => setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)}>
                        <Text>Flip</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
};

const styles = StyleSheet.create({
    camLayout: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    flipText: {
        fontSize: 18,
        marginBottom: 10,
        color: 'white'
    }

});

export default CameraFunc;
