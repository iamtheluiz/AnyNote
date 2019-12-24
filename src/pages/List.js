import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import {
  AsyncStorage,
  Image,
  StyleSheet,
  StatusBar,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity
} from 'react-native';
import colors from '../config/colors';

// Icons
import backIcon from '../assets/back-arrow.png';
import list from '../assets/list.png';

export default function List(props) {
  const [item, setItem] = useState({
    color: '#6edcda'
  });
  const [modalDisplay, setModalDisplay] = useState(false);

  useEffect(() => {
    async function getListInfo() {
      setItem(JSON.parse(await AsyncStorage.getItem('@anynote/selectedList')));
    }

    getListInfo();
  }, []);

  useEffect(() => {
    if(item.title && item.description) {
      saveList();
    }
  }, [item]);

  function handleBack() {
    props.navigation.navigate('Dashboard');
  }

  function handleDisplayModal() {
    setModalDisplay(modalDisplay ? false : true);
  }

  async function handleSelectColor(color) {
    setItem({ ...item, color });

    setModalDisplay(false);
  }

  async function saveList() {
    // Get all lists
    let lists = JSON.parse(await AsyncStorage.getItem('@anynote/lists'));

    // Filter our selected list
    lists = lists.filter(list => list.id !== item.id);
    
    lists.push(item);
    
    // Store
    await AsyncStorage.setItem('@anynote/lists', JSON.stringify(lists));
  }

  return (
    <>
      {item !== null ? <>
        <StatusBar backgroundColor={item.color} barStyle='light-content' />
        <SafeAreaView style={{ ...styles.container, backgroundColor: item.color }}>

          <View style={styles.menu}>
            <TouchableOpacity onPress={handleBack}>
              <Image style={styles.menuBackArrow} source={backIcon} />
            </TouchableOpacity>
            <Text style={styles.title}>
              {item.title}
            </Text>
            <TouchableOpacity onPress={handleDisplayModal} style={{ ...styles.selectListColor, backgroundColor: item.color }}></TouchableOpacity>
          </View>
          <ScrollView scrollEnabled={false} style={styles.noteList}>

          </ScrollView>

          <View style={modalDisplay ? styles.colorModal : { display: 'none' }}>
            <Text style={styles.modalTitle}>Cor da Lista</Text>
            {colors.map((color, index) => (
              <TouchableOpacity style={{ ...styles.colorModalItem, backgroundColor: color }} key={index} onPress={() => handleSelectColor(color)}>
                <Image style={styles.image} source={list} />
                <View style={styles.listInfo}>
                  <Text style={styles.listTitle}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
      </> : <></>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  colorModal: {
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
  colorModalItem: {
    width: '94%',
    height: 100,
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 50,
    height: 50,
  },
  listInfo: {
    marginLeft: 10
  },
  listTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white'
  },
  description: {
    fontSize: 20,
    color: 'white'
  },
  menu: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  menuBackArrow: {
    width: 30,
    height: 30
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  },
  selectListColor: {
    width: 30,
    height: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    elevation: 1,
  },
  noteList: {
    flex: 1,
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    elevation: 2
  }
})
