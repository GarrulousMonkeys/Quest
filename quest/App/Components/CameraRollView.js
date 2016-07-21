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

import CameraRollPicker from 'react-native-camera-roll-picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  imageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100,
    margin: 5
  },
  textSample: {
    fontSize: 50,
    color: 'black'
  },
  highlight: {
    width: 100,
    height: 100,
    // margin: 10
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

class CameraRollView extends Component {
  constructor() {
    super();
    this.state = {
      selected: [],
      num: 0,
      imageSelected: false,
    }
  }
  getSelectedImage(selectedImage, currentImage) {
    let num = selectedImage.length;
    this.setState({
      num: num,
      selected: selectedImage
    });
    if (!this.state.selected[0]) {
      this.setState({imageSelected: false})
    } else if (this.state.selected[0] && currentImage.uri === this.state.selected[0].uri) {
      this.setState({imageSelected: true})
    }
  }
  handleSubmit() {
    console.log('HANDLING SUBMIT');
    // this is where we submit to db???
  }
  buttonShow() {
    return this.state.imageSelected ? <TouchableHighlight onPress={this.handleSubmit.bind(this)}>
            <View style={styles.bottomNavButton}>
              <Text style={styles.buttonText}>SELECT</Text>
            </View>
          </TouchableHighlight> : <View></View>
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <TouchableHighlight>
            <View style={styles.imageGrid}>
              <CameraRollPicker
                callback={this.getSelectedImage.bind(this)}
                selected={this.state.selected}
                maximum={1}/>
            </View>
          </TouchableHighlight>
        </ScrollView>
          {this.buttonShow()}
      </View>
    )
  }
}

export { CameraRollView };