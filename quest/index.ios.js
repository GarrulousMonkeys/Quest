import * as firebase from 'firebase';
import React, { Component } from 'react';
import { SignInView } from './App/Components/SignInView';
import { SignUpView } from './App/Components/SignUpView';
import { MainMapView } from './App/Components/MainMapView';
import { ProfileView } from './App/Components/ProfileView';
import { ArtifactListView } from './App/Components/ArtifactListView';
import { DropView } from './App/Components/DropView';
import { CameraView } from './App/Components/CameraView';
import { CameraRollView } from './App/Components/CameraRollView';
import { SubmitImageView } from './App/Components/SubmitImageView';

import {
  AppRegistry,
  StyleSheet,
  Navigator,
} from 'react-native';

// Initialize Firebase
import { ENV } from './environment/environment';
const firebaseApp = firebase.initializeApp(ENV);

// Initialize Routes
const ROUTES = {
  SignInView: SignInView,
  SignUpView: SignUpView,
  MainMapView: MainMapView,
  ProfileView: ProfileView,
  ArtifactListView: ArtifactListView,
  DropView: DropView,
  CameraView: CameraView,
  CameraRollView: CameraRollView,
  SubmitImageView: SubmitImageView
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

// container component
class quest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dbRef: firebaseApp.database().ref(),
      storageRef: firebaseApp.storage().ref() 
    }
  }

  componentDidMount() {
      this.listenForData(this.state.dbRef);
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

  renderScene(route, navigator) {
    let Component = ROUTES[route.name];
    return (
      <Component 
        route={route}
        dbRef={this.state.dbRef}
        storageRef={this.state.storageRef}
        navigator={navigator} />
    );
  }

  render() {
    return (
      <Navigator
        initialRoute={ {name: 'SignInView'} } 
        style={ styles.container }
        renderScene={ this.renderScene.bind(this) }
        configureScene={ () => {return Navigator.SceneConfigs.FloatFromRight} } />
    );
  }
}

AppRegistry.registerComponent('quest', () => quest);
