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
  NativeModules,
  Navigator,
  TouchableHighlight,
  Text
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

// NavBar Routes
const NavigationBarRouteMapper = {
  Title: (route, navigator, index, navState) => { 
    return (<Text style={styles.title}>{route.name}</Text>); 
  },
  LeftButton: (route, navigator, index, navState) => {
    if (index === 0) {
      return null;
    } else {
      return (
        <TouchableHighlight 
          underlayColor='gray'
          onPress={() => navigator.pop()}>
          <Text style={styles.back}>Back</Text>
        </TouchableHighlight>
      );
    }
  },
  RightButton: (route, navigator, index, navState) => {
    return null 
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navBar: {
    backgroundColor: '#F9F9F9'
  },
  title: {
    fontSize: 16,
    padding: 10
  },
  back: {
    fontSize: 16,
    color: '#03a9f4',
    padding: 10
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

  renderScene(route, navigator) {
    let Component = ROUTES[route.name];
    let path = route.path || null;
    return (
      <Component
        route={route}
        path={path}
        dbRef={this.state.dbRef}
        storageRef={this.state.storageRef}
        navigator={navigator} />
    );
  }

  render() {
    return (
      <Navigator
        initialRoute={ {name: 'SignInView', index: 0} } 
        style={ styles.container }
        renderScene={ this.renderScene.bind(this) }
        configureScene={ () => {return Navigator.SceneConfigs.FloatFromRight} }
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={ NavigationBarRouteMapper }
            style={ styles.navBar } />
        } />
    );
  }
}

AppRegistry.registerComponent('quest', () => quest);
