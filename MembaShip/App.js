import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet, Text, View, Button } from 'react-native';

import Header from './components/header';
import CameraFunc from './components/camera';

let tdGreetHours = new Date().getHours();
//let tdGreetMins = new Date().getMinutes();
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

  return (
    <View style={styles.screen}>
      <Header title={'MembaShip'} greet={'Good ' + greetMsg + ' Climber'} />
      <Button title='Add New Card' onPress={() => setIsCamera(true)} />
      {/* <CameraFunc visable={isCamera} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
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