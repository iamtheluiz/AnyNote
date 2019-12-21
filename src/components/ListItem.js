import React, { useState } from 'react';
import {
  Animated,
  AsyncStorage,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  View
} from 'react-native';
import { withNavigation } from 'react-navigation';

// Icons
import list from '../assets/list.png';

// Fade In Animation
const FadeInView = (props) => {
  const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 200,
      }
    ).start();
  }, [])

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}
    >
      {props.children}
    </Animated.View>
  );
};

function ListItem(props) {
  async function handleGetList() {
    // Set selected list
    await AsyncStorage.setItem("@anynote/selectedList", JSON.stringify(props.item));

    props.navigation.navigate('List');
  }

  return (
    <FadeInView>
      <TouchableOpacity style={{ ...styles.list, backgroundColor: props.item.color }} onPress={handleGetList}>
        <Image style={styles.image} source={list} />
        <View style={styles.listInfo}>
          <Text style={styles.listTitle}>{props.item.title}</Text>
          <Text style={styles.description}>{props.item.description}</Text>
        </View>
      </TouchableOpacity>
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
    height: 100,
    padding: 15,
    borderRadius: 10,
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
  }
});

export default withNavigation(ListItem);