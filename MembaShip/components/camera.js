import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const CameraFunc = props => {
    const [captures, setCaptures] = useState();

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if (result.status !== 'granted') {
            Alert.alert(
                'Permission Has Been Denied',
                'Permission Needed To Access Camera',
                [{text: 'Confirm'}]
            );
            return false;
        }
        return true;
    }

    const takeSnapHandler = async () => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission){
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
        });
        setCaptures(image.uri);
        props.passImage(image.uri);
    }

    return (
        <View>
            <Button title={'Snap'}onPress={takeSnapHandler} />
        </View>
    );




}
//     const [hasPermission, setHasPermission] = useState(null);
//     const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
//     const [flashStat, setFlashStat] = useState('Flash Off');
//     const [captures, setCaptures] = useState([]);

//     useEffect(() => {
//         (async () => {
//             const { status } = await Camera.requestPermissionsAsync();
//             setHasPermission(status === 'granted');
//         })();
//     }, []);

//     if (hasPermission === null) {
//         return <View />
//     }

//     if (hasPermission === false) {
//         Alert.alert(
//             "Oh NO",
//             "No Camera Permission Granted",
//             [{
//                 text: "Grant Permission",
//                 onPress: () => setHasPermission(true)
//             },
//             {
//                 text: "Cancel",
//                 onPress: () => console.log("Canceled Permissions")
//             }
//             ],
//             {
//                 cancelable: false
//             }
//         );
//     }

//     const snapPicture = async () => {
//         if (this.camera) {
//             const { status }= Camera.Constants.onCameraReady;
//             const options = { quality: 1, base64: true };
//             let photo = await this.camera.takePictureAsync(options);
//             setCaptures([...captures, photo]);
//             console.log(captures);
//         }
//     };

//     return (
//         <View style={styles.camLayout}>
//             <Camera style={styles.strech} flashMode={flash} ref={ref => this.camera = ref}>
//                 <View style={styles.transView}>
//                     <TouchableOpacity style={styles.flipPos}
//                         onPress={() => setFlash(flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off)}
//                         onPress={() => setFlashStat(flashStat === 'Flash Off' ? 'Flash On' : 'Flash Off')}>
//                         <Text style={styles.flipText}>{flashStat}</Text>
//                     </TouchableOpacity>
//                 </View>
//             </Camera>
//             <TouchableOpacity onPress={() => snapPicture()}>
//                 <Text>Capture</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     camLayout: {
//         flex: 1,
//         //flexDirection: 'row',
//         //justifyContent: 'center',
//     },
//     strech: {
//         flex: 1
//     },
//     transView: {
//         flex: 1,
//         backgroundColor: 'transparent',
//         flexDirection: 'row',
//     },
//     flipPos: {
//         flex: 0.3,
//         alignSelf: 'flex-end',
//         alignItems: 'center'
//     },
//     flipText: {
//         fontSize: 18,
//         marginBottom: 10,
//         color: 'white',
//     },
// });

export default CameraFunc;
