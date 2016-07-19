import React, { Component } from 'react';
import {MapViewContainer} from './MapViewContainer';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class Profile extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Test
        </Text>
      </View>
    ); 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export { Profile };