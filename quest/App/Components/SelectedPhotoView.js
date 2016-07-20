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
    justifyContent: 'center'
  },
  currImage: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover'
  },
      bottomNav: { 
    flex:2,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  bottomNavButton: {
    flex:1,
    backgroundColor: "#d3d3d3",
    alignItems: 'center',
    borderWidth: 1
  }

});

class SelectedPhotoView extends Component {
  constructor(props) {
    super(props);
    console.log('PROPS IS ', this.props);
  }
  render() {
    return (
      <Image style={ styles.currImage } 
        source={{ uri: this.props.uri }}>
          <View style={styles.bottomNav}>
            <TouchableHighlight>
              <View style={styles.bottomNavButton}>
                <Text>Select</Text>
              </View>
            </TouchableHighlight>
          </View>
      </Image>
    )
  }
}



export { SelectedPhotoView };