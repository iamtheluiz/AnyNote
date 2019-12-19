import React, { useState } from 'react';
import 'react-native-gesture-handler';
import {
  AsyncStorage,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native';
import Lottie from 'lottie-react-native';

// Import animation
import bookmark from '../assets/bookmark-animation.json';

export default function anynote() {
  const [name, setName] = useState("");

  handleSubmit = () => {
    // Store Name
  }

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView style={style.container}>
        <Lottie resizeMode="contain" autoSize source={bookmark} autoPlay loop={false} />
        <Text style={style.title}>AnyNote</Text>
        <TextInput style={style.input} placeholder="Seu Nome" placeholderTextColor="#6edcdaaa" onChangeText={value => setName(value)} />
        <TouchableOpacity style={style.submitButton} onPress={handleSubmit}>
          <Text style={style.submitButtonText}>Enviar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 50,
    color: '#6edcda',
    marginBottom: 30,
    fontWeight: 'bold'
  },
  input: {
    width: '80%',
    borderWidth: 2,
    color: '#6edcda',
    borderColor: '#6edcda',
    borderRadius: 5,
    padding: 10,
    fontSize: 20,
    marginBottom: 10,
  },
  submitButton: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6edcda',
    borderRadius: 5,
    padding: 10
  },
  submitButtonText: {
    color: 'white',
    fontSize: 25,
  }
})
