import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import {
  AsyncStorage,
  Image,
  StyleSheet,
  StatusBar,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity
} from 'react-native';

// Icon
import backIcon from '../assets/back-arrow.png';

export default function List(props) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    async function getListInfo() {
      setItem(JSON.parse(await AsyncStorage.getItem('@anynote/selectedList')));
    }

    getListInfo();
  }, []);

  function handleBack() {
    props.navigation.navigate("Dashboard");
  }

  function handleSelectListColor() {
    console.log(item);
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
            <TouchableOpacity onPress={handleSelectListColor} style={styles.selectListColor}></TouchableOpacity>
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
    borderColor: 'white'
  }
})
