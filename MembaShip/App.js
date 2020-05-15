import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Modal, FlatList, Image } from 'react-native';

import Header from './components/header';
import CameraFunc from './components/camera';
import CardItem from './components/cardItem';

let tdGreetHours = new Date().getHours();
let greetMsg;

if (tdGreetHours >= 0) {
  greetMsg = 'Morning';
} if (tdGreetHours >= 12) {
  greetMsg = 'Afternoon';
} if (tdGreetHours >= 17) {
  greetMsg = 'Evening';
};


export default function App() {
  const [isCamera, setIsCamera] = useState(false);
  const [isDisplayCard, setIsDisplayCard] = useState(false)
  const [allCaptures, setAllCaptures] = useState([]);
  const [pickedImage, setPickedImage] = useState();
  const [pickedId, setPickedId] = useState();

  const allCapturesHandler = (imagePath, dis) => {
    setAllCaptures([...allCaptures, { image: imagePath, id: dis }]);
    console.log(allCaptures);
  }
  const closeCameraModal = bool => {
    setIsCamera(bool);
  }

  const closeCardModal = bool => {
    setIsDisplayCard(bool);
  }


  const deleteFunc = (image, id) => {
    const filter = allCaptures.filter(item => item.image !== image, item => item.id !== id);
    setAllCaptures(filter);
  }

  const displayChosenCard = (image, id) => {
    console.log(image, id);
    setPickedImage(image);
    console.log(pickedImage);
    setPickedId(id);
    setIsDisplayCard(true);

  }

  return (
    <View style={styles.screen}>
      <View>
        <Header title='MembaShip' greet={'Good ' + greetMsg + ' Climber'} />
        <Button title='Add New Card' onPress={() => setIsCamera(true)} />
      </View>

      <FlatList data={allCaptures} renderItem={itemData => <CardItem image={itemData.item.image} discrip={itemData.item.id} onSelect={displayChosenCard} deleteCard={deleteFunc} />} />

      <Modal visible={isCamera} animationType='slide'>
        <View>
          <CameraFunc passData={allCapturesHandler} modalFinish={closeCameraModal} />
        </View>
      </Modal>

      <Modal visible={isDisplayCard} animationType='fade'>
        <View style={{flex: 1}}>
          <Text>{pickedId}</Text>
          <Image style={styles.imageStyle} source={{ uri: pickedImage }} />
          <Button title='Close' onPress={() => setIsDisplayCard(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  btnView: {
    flex: 0.5,
    justifyContent: 'flex-end',
  },
  btnStyle: {
    margin: 50,
    padding: 50,
    borderRadius: 60
  },
  imageStyle: {
    height: '90%',
    width: '100%',
    alignSelf: 'center'

  }
});



// const FadeInView = (props) => {
//   const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0

//   React.useEffect(() => {
//     Animated.timing(
//       fadeAnim,
//       {
//         toValue: 1,
//         duration: 3000,
//       }
//     ).start();
//   })

//   return (
//     <Animated.View                 // Special animatable View
//       style={{
//         ...props.style,
//         opacity: fadeAnim,         // Bind opacity to animated value
//       }}
//     >
//       {props.children}
//     </Animated.View>
//   );
// }

// // You can then use your `FadeInView` in place of a `View` in your components:
// export default() => {
//   return (
//     <View style={styles.centeredText}>
//       <FadeInView style={styles.fadeInAnimation}>
//         <Text style={styles.fadeInText}>Good {greetMsg} :P</Text>
//       </FadeInView>
//     </View>
//   )
// }