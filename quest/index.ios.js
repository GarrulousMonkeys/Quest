/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {ArtifactList} from './App/Components/ArtifactListView';
import {MapViewContainer} from './App/Components/MapViewContainer';
import {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  Image,
  View,
  NavigatorIOS,
  TouchableHighlight,
  TouchableWithoutFeedback,
  MapView
} from 'react-native';

class quest extends Component {
  constructor(props) {
    super(props)
    this.state = {navigationBarHidden: false}
  }

  toggleNavBar() {
    this.setState({
      navigationBarHidden: !this.state.navigationBarHidden
    });
  }

  render() {
    return (
      <NavigatorIOS ref="nav"
                    itemWrapperStyle={styles.navWrap}
                    style={styles.nav}
                    navigationBarHidden={this.state.navigationBarHidden}
                    initialRoute={{
                      component: MapViewContainer,
                      title: "Map View",
                      passProps: {
                        //toggleNavBar: this.toggleNavBar.bind(this)
                      }
                    }} />
    );
  }
}

const styles = StyleSheet.create({
  navWrap: {
    flex: 1
  }, 
  nav: {
    flex: 1
  }
});

AppRegistry.registerComponent('quest', () => quest);
