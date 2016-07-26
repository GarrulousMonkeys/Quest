import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  CameraRoll,
  TextInput,
  Slider,
  Dimensions,
  NativeModules,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Switch,
  ScrollView
} from 'react-native';
import Camera from 'react-native-camera';
import { CameraRollExample } from './CameraRollView';
import ReadTheData from 'NativeModules';
const ReadImageData = ReadTheData.ReadImageData;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: 'red',
    borderRadius: 50,
    height: 100,
    width: 100,
    padding: 10,
    justifyContent: 'center',
    margin: 40,
    borderWidth: 5,
    borderColor: 'white'
  },
  goToCameraRoll: {
    borderRadius: 25,
    justifyContent: 'center',
    height: 50,
    width: 50,
    backgroundColor: 'white'
  },
  cameraRollText: {
    color: 'black',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  }
});

class CameraView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: '',
      base64: ''
    }
  }

  takePicture() {
    this.camera.capture()
      .then((data) => this.setState({ path: data.path }))
      .then(() => ReadImageData.readImage(this.state.path, (image) => {
        this.setState({ base64: 'data:image/jpeg;base64,' + image });
        this._handleNextPage('SubmitImageView');
      }))
      .catch(err => console.error(err));
  }

  _handleNextPage(name) {
    this.props.navigator.push({
      name: name,
      path: this.state.path,
      base64: this.state.base64
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
            <TouchableHighlight onPress={() => this._handleNextPage('CameraRollView')}>
              <View style={styles.goToCameraRoll}>
                <Image source={require('./Assets/cameraroll.png')}/>
              </View>
            </TouchableHighlight>
          <TouchableHighlight onPress={this.takePicture.bind(this)}>
            <View style={styles.capture}></View>
          </TouchableHighlight>
        </Camera>
      </View>
    )
  }
}

export { CameraView }; 