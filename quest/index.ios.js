/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as firebase from 'firebase';
import React, { Component } from 'react';
import {ArtifactList} from './App/Components/ArtifactListView';
import {SignIn} from './App/Components/SignIn';
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
  MapView,
  AlertIOS
} from 'react-native';

// Initialize Firebase
const configKey = require('./environment/environment');
var firebaseApp = firebase.initializeApp(configKey);

class quest extends Component {
  constructor(props) {
    super(props)
    this.state = {navigationBarHidden: false}
    this.dbRef = firebaseApp.database().ref();
  }

  listenForData(dbRef) {

    dbRef.on('value', (newRawData) => {

      //get new data elements and do something with them
      var newItems = [];
      newRawData.forEach((item) => {
        
        //AlertIOS.alert('New value entered');
      });

      //Uncomment when we have real user data in the Firebase database
      // this.setState({
      //   dataSource: this.state.dataSource.cloneWithRows(newItems)
      // });

    });
  }

  componentDidMount() {
      this.listenForData(this.dbRef);
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
                      component: SignIn,
                      title: "Log In",
                      passProps: {
                        dbRef: this.dbRef
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
