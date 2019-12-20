import React, { useState } from 'react';
import {
  Animated,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  View
} from 'react-native';

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

export default function ListItem(props) {
  return (
    <FadeInView>
      <TouchableOpacity style={{ ...styles.list, backgroundColor: props.color }}>
        <Image style={styles.image} source={list} />
        <View style={styles.listInfo}>
          <Text style={styles.listTitle}>{props.item}</Text>
          <Text style={styles.description}>Descrição da Lista</Text>
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
})