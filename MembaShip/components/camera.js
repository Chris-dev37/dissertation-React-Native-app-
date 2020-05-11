import React from 'react';
import { Modal, View, Text, StyleSheet, Button } from 'react-native';


const CameraFunc = props => {
    
    return (
        <Modal visible={props.vis} animationType='slide'>
            <View style={styles.camLayout}>
                <Text>aaa</Text>
                <Button title='Finished' onPress={hideModal()} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    camLayout: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CameraFunc;
