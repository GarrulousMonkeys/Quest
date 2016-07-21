import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  CameraRoll,
  TextInput,
  Slider,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Switch,
  ScrollView
} from 'react-native';

class SubmitImageView extends Component {
  constructor() {
    super();
  }

  _handleSubmit() {
    this.props.navigator.popToTop();
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.mainImage} source={{uri: 'https://media.giphy.com/media/3o6UBo8U2iHUG5mszS/giphy.gif'}}/>
        <TextInput style={styles.caption} placeholder='Add caption'></TextInput>
        <TouchableHighlight onPress={() => this._handleSubmit()}>
            <View style={styles.bottomNavButton}>
              <Text style={styles.buttonText}>SUBMIT ARTIFACT</Text>
            </View>
          </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#FFF'
  },
  mainImage: {
    height: 500,
    marginTop: 50
  },
  caption: {
    height: 100,
    textAlign: 'center'
  },
   bottomNav: { 
    flex:2,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  bottomNavButton: {
    flex:1,
    backgroundColor: "#24CE84",
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 30,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 30
  }
})
export { SubmitImageView };