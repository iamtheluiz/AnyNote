import React, { useState, useEffect } from 'react';
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

export default function anynote({ navigation }) {
  const [name, setName] = useState(null);

  useEffect(() => {

    // Get user info
    async function getUserInfo() {
      // Set list ID
      const id = await AsyncStorage.getItem("@anynote/id");

      if (id === null) {
        // First list ID
        await AsyncStorage.setItem("@anynote/id", "0");
      }

      const userName = await AsyncStorage.getItem("@anynote/name");

      if (userName !== null) {
        // Redirect to "Dashboard"
        navigation.navigate("Dashboard");
      } else {
        setName("");
      }
    }

    getUserInfo();
  }, []);

  handleSubmit = async () => {
    // Store Name
    await AsyncStorage.setItem("@anynote/name", name);

    // Redirect to "Dashboard"
    navigation.navigate("Dashboard");
  }

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      {name !== null ? (
        <SafeAreaView style={styles.container}>
          <Lottie resizeMode="contain" autoSize source={bookmark} autoPlay loop={false} />
          <Text style={styles.title}>AnyNote</Text>
          <TextInput style={styles.input} placeholder="Seu Nome" placeholderTextColor="#6edcdaaa" onChangeText={value => setName(value)} autoCapitalize="words" />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Enviar</Text>
          </TouchableOpacity>
        </SafeAreaView>
      ) : <></>}
    </>
  );
}

const styles = StyleSheet.create({
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
