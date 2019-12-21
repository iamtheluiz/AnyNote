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

// Components
import ListItem from '../components/ListItem';

export default function Dashboard(props) {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    // Get user name and lists
    async function getAppInfo() {
      const userName = await AsyncStorage.getItem('@anynote/name');
      const userLists = JSON.parse(await AsyncStorage.getItem('@anynote/lists'));

      if (userName === null) {
        props.navigation.navigate('Home');
      } else {
        setName(userName);
      }

      if (userLists === null) {
        setList([]);
      } else {
        setList(userLists);
      }
    }

    // Show name and lists after some seconds
    getAppInfo();
  }, []);

  async function handleCreateList() {
    // Get last list ID
    let id = await AsyncStorage.getItem('@anynote/id');
    id++;

    const newList = [...list, {
      id,
      title: 'Teste',
      description: 'Descrição da Lista',
      color: '#5c6fe6',
      items: []
    }];

    // Create new list
    setList(newList);

    // Store lists
    await AsyncStorage.setItem('@anynote/lists', JSON.stringify(newList));

    // Store new id value
    await AsyncStorage.setItem('@anynote/id', JSON.stringify(id));
  }

  return (
    <>
      <StatusBar backgroundColor='#6edcda' barStyle='light-content' />
      <ImageBackground source={backgroundFigure} style={{ width: '100%', height: 250 }} />
      <View style={name ? styles.container : { ...styles.container, ...styles.verticalAlign }}>

        {name ?
          <>
            <ScrollView style={styles.ScrollView} showsVerticalScrollIndicator={false}>
              <Text style={styles.welcome}>Olá <Text style={{ ...styles.welcome, fontWeight: 'bold' }}>{name}!</Text></Text>
              {list.map((item, index) => <ListItem key={index} item={item} />)}
            </ScrollView>
            <TouchableOpacity style={styles.createListButton} onPress={handleCreateList}>
              <Image style={styles.buttonSvg} source={plus} />
            </TouchableOpacity>
          </>
          :
          <Lottie resizeMode='contain' autoSize source={loading} autoPlay loop />}
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