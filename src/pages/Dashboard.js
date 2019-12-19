import React, { useState, useEffect } from 'react';
import {
  AsyncStorage,
  Image,
  ImageBackground,
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';
import Lottie from 'lottie-react-native';

// Loading animation
import loading from '../assets/loading-animation.json';

// Images
import plus from '../assets/plus.png';
import backgroundFigure from '../assets/background-figure.png';

export default function Dashboard() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    // Get user name
    async function getUserName() {
      setName(await AsyncStorage.getItem("@anynote/name"));
    }

    // Show name after some seconds
    setTimeout(() => {
      getUserName();
    }, 1300);
  }, []);

  function handleCreateList() {
    setList([ ...list, "Teste"]);
  }

  return (
    <>
      <StatusBar backgroundColor="#6edcda" barStyle="light-content" />
      <ImageBackground source={backgroundFigure} style={{ width: '100%', height: 300 }} />
      <View style={name ? styles.container : { ...styles.container, ...styles.verticalAlign }}>

        {name ?
          <>
            <ScrollView style={styles.ScrollView} showsVerticalScrollIndicator={false}>
              <Text style={styles.welcome}>Olá <Text style={{ ...styles.welcome, fontWeight: 'bold' }}>{name}!</Text></Text>
              {list.map((item, index) => <TouchableOpacity key={index} style={styles.list}>
                <Text style={styles.listTitle}>{item}</Text>
              </TouchableOpacity>)}
            </ScrollView>
            <TouchableOpacity style={styles.createListButton} onPress={handleCreateList}>
              <Image style={styles.buttonSvg} source={plus} />
            </TouchableOpacity>
          </>
          :
          <Lottie resizeMode="contain" autoSize source={loading} autoPlay loop />}
      </View >
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  verticalAlign: {
    backgroundColor: '#6edcda',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ScrollView: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  welcome: {
    fontSize: 40,
    color: 'white',
    textShadowColor: '#BBB',
    textShadowRadius: 5,
  },
  list: {
    width: '100%',
    height: 100,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: '#5c6fe6',
    marginTop: 10,
  },
  listTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white'
  },
  createListButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    elevation: 5
  },
  buttonSvg: {
    width: 30,
    height: 30,
  }
})