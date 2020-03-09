import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

let tdGreetHours = new Date().getHours();
//let tdGreetMins = new Date().getMinutes();
let greetMsg;

if (tdGreetHours >= 0){
  greetMsg = "Morning";
}if(tdGreetHours >= 12){
  greetMsg = "Afternoon";
}if(tdGreetHours >= 17){
  greetMsg = "Evening";
};


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Good {greetMsg} :P</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0096db',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
