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

import { SelectedPhotoView } from './SelectedPhotoView';

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

  }
})

class CameraRollExample extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      selected: '',
      selectedImage: {}
    }
  }

  selectImage(image, uri) {
    this.setState({
      selected: uri,
      selectedImage: image
    });
  }

  changeView() {
    this.props.navigator.push({
      title: 'Select this photo?',
      component: SelectedPhotoView,
      passProps: {
        uri: this.state.selected,
        image: this.state.selectedImage
      }
    });
  }
  
  componentDidUpdate() {
    this.changeView();
  }

  storeImages(data) {
    const assets = data.edges;
    const images = assets.map(asset => asset.node.image);
    this.setState({
      images: images,
      selected: ''
    });

  }

  logError(err) {
    console.log(err);
  }
  componentDidMount() {
    const fetchParams = {
      first: 25
    }
    CameraRoll.getPhotos(fetchParams)
      .then((data) => this.storeImages(data), (e) => logError(e));
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.imageGrid}>
          {this.state.images.map((image, index) => 
            <TouchableHighlight key={index} style={styles.image} onPress={this.selectImage.bind(this, image, image.uri)}>
              <Image style={styles.image} source={{ uri: image.uri }}/>
            </TouchableHighlight>
            )}
        </View>
      </ScrollView>
    )
  }
}

export { CameraRollExample };