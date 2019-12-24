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
  TextInput,
  TouchableOpacity
} from 'react-native';
import Lottie from 'lottie-react-native';
import colors from '../config/colors';

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
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    color: "#6edcda",
    itens: []
  });
  const [modalDisplay, setModalDisplay] = useState(false);

  useEffect(() => {
    // Get user name and lists
    async function getAppInfo() {
      const userName = await AsyncStorage.getItem('@anynote/name');
      let userLists = JSON.parse(await AsyncStorage.getItem('@anynote/lists'));

      if (userName === null) {
        props.navigation.navigate('Home');
      } else {
        setName(userName);
      }

      if (userLists === null) {
        setList([]);
      } else {
        // Sort list
        userLists = userLists.sort((a, b) => (parseInt(a.id) - parseInt(b.id)));

        setList(userLists);
      }
    }

    // Show name and lists after some seconds
    getAppInfo();
  }, []);

  function handleDisplayModal() {
    setModalDisplay(modalDisplay ? false : true);
  }

  function handleSelectColor(color) {
    setNewItem({ ...newItem, color });
  }

  async function handleSubmit() {
    if (newItem.title !== "" && newItem.description !== "") {
      // Get last list ID
      let id = await AsyncStorage.getItem('@anynote/id');
      id++;

      let newList = list;
      newList.push({
        id,
        ...newItem
      });

      // Create new list
      setList(newList);

      setNewItem({
        itens: []
      });

      // Store lists
      await AsyncStorage.setItem('@anynote/lists', JSON.stringify(newList));

      // Store new id value
      await AsyncStorage.setItem('@anynote/id', JSON.stringify(id));

      // Close modal
      setModalDisplay(false);
    }
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
            <TouchableOpacity style={styles.createListButton} onPress={handleDisplayModal}>
              <Image style={styles.buttonSvg} source={plus} />
            </TouchableOpacity>
          </>
          :
          <Lottie resizeMode='contain' autoSize source={loading} autoPlay loop />}
      </View >

      <View style={modalDisplay ? styles.modal : { display: 'none' }}>
        <Text style={styles.modalTitle}>Nova Lista</Text>
        <TextInput style={styles.input} placeholder="Nome da Lista" placeholderTextColor="#6edcdaaa" autoCapitalize="words" onChangeText={(value) => { setNewItem({ ...newItem, title: value }) }} />
        <TextInput style={styles.input} placeholder="Descrição da Lista" placeholderTextColor="#6edcdaaa" autoCapitalize="words" onChangeText={(value) => { setNewItem({ ...newItem, description: value }) }} />
        <View style={styles.modalColors}>
          {colors.map((color, index) => (
            <TouchableOpacity style={{
              ...styles.modalColorItem,
              backgroundColor: color,
              borderWidth: color === newItem.color ? 4 : 0,
              borderColor: '#777'
            }} key={index} onPress={() => handleSelectColor(color)} />
          ))}
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
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
  },
  modal: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    margin: 15,
    borderRadius: 20,
    paddingTop: 20,
    backgroundColor: 'white',
    elevation: 5,
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#555',
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
  modalColors: {
    flexDirection: 'row'
  },
  modalColorItem: {
    width: 50,
    height: 50,
    borderRadius: 15,
    margin: 5
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