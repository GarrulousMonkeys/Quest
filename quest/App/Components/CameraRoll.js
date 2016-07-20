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
    console.log(this.state.selectedImage);
  }

  storeImages(data) {
    const assets = data.edges;
    const images = assets.map(asset => asset.node.image);
    this.setState({
      images: images,
      selected: ''
    });
    console.log(this);

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
          {this.state.images.map(image => 
            <TouchableHighlight style={styles.image} onPress={this.selectImage.bind(this, image, image.uri)}>
              <Image style={styles.image} source={{ uri: image.uri }}/>
            </TouchableHighlight>
            )}
        </View>
      </ScrollView>
    )
  }
}

export { CameraRollExample };