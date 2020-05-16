import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Modal, FlatList, Image } from 'react-native';

import Header from './components/header';
import CameraFunc from './components/camera';
import CardItem from './components/cardItem';

let tdGreetHours = new Date().getHours(); // 
let greetMsg;                             //
                                          //
if (tdGreetHours >= 0) {                  //
  greetMsg = 'Morning';                   //
} if (tdGreetHours >= 12) {               // This section is used to set a variable to be use to provide the user with a time specific greeting
  greetMsg = 'Afternoon';                 //
} if (tdGreetHours >= 17) {               //
  greetMsg = 'Evening';                   //
};

export default function App() {
  // React Hooks used to handle state changes, the first const in the square is used to store the state and the second const is a function thats called when the state is needed to be changed
  const [isCamera, setIsCamera] = useState(false); // Hook used to handle the state of the camera modal's visable prop 
  const [isDisplayCard, setIsDisplayCard] = useState(false) // Hook used to handle the state of the visable prop for the modal that displays the selected card from the flatlist
  const [allCaptures, setAllCaptures] = useState([]); // Hook that handles the image uri's and id's returned from the cameraFunc component. As the useState is passed '[]' the 'allCaptures is set to represent an empty array
  const [pickedImage, setPickedImage] = useState(); // Hook used to handle the selected image for use in the displayCard modal
  const [pickedId, setPickedId] = useState(); // Hook used to handle the selected id for use in the displayCard modal

  const allCapturesHandler = (imagePath, dis) => {
    setAllCaptures([...allCaptures, { image: imagePath, id: dis }]); // Here the '...' operator before the allCaptures array tells the software to inherit all the elements from the array and merge them with the parameters passed as the second parameter for the setAllCaptures
  }
  const closeCameraModal = bool => {
    setIsCamera(bool); // Here the function is called to change the state of the modal where the user takes a picture of a card in order to close it and display the home screen again
  }

  const deleteFunc = (image, id) => {
    const filter = allCaptures.filter(item => item.image !== image, item => item.id !== id); 
    setAllCaptures(filter); // Here the function is called when the user wants to delete a selected item within the flatlist. A new const is created to store an array with the selected item filtered out, then this const is passed to overwrite the existing array. Updating the flatlist 
  }

  const displayChosenCard = (image, id) => {
    setPickedImage(image);
    setPickedId(id); // Here the function is used to take parameters past to it from the flatlist 'onSelect' prop so the selected item's image uri and id can be displayed on a seperate modal. That modal's visability is also set to true. 
    setIsDisplayCard(true);

  }

  return (
    <View style={styles.screen}>
      <View>
        <Header title='MembaShip' greet={'Good ' + greetMsg + ' Climber'} />
        <View style={styles.btnStyle} >
          <Button color='#ff8c00' title='Add New Card' onPress={() => setIsCamera(true)} />
        </View>
      </View>

      <FlatList data={allCaptures} renderItem={itemData => <CardItem image={itemData.item.image} discrip={itemData.item.id} onSelect={displayChosenCard} deleteCard={deleteFunc} />} /> 

      <Modal visible={isCamera} animationType='slide' onRequestClose={closeCameraModal} > 
        <View style={{backgroundColor: '#ffdead', flex: 1}}>
          <CameraFunc passData={allCapturesHandler} modalFinish={closeCameraModal} />
        </View>
      </Modal>

      <Modal visible={isDisplayCard} animationType='fade' onRequestClose={setIsDisplayCard}> 
        <View style={{backgroundColor: '#ffdead', flex: 1}}>
          <Text style={styles.displayCardText}>{pickedId}</Text>
          <Image style={styles.imageStyle} source={{ uri: pickedImage }} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({ // stylesheet used to store styles for use over the document. Simialr to CSS
  screen: {
    flex: 1,
    backgroundColor: '#ffdead'
  },
  btnStyle: {
    padding: 30
  },
  imageStyle: {
    height: '93%',
    width: '100%',
    alignSelf: 'center'
  },
  displayCardText: {
    alignSelf: 'center',
    fontSize: 22,
    paddingVertical: 11
  }
});
