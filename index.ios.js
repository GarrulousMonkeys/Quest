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
import dismissKeyboard from 'react-native-dismiss-keyboard';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  TouchableHighlight
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
};

const TITLES = {
  SignInView: 'Sign In',
  SignUpView: 'Sign Up',
  MainMapView: 'Map',
  ProfileView: 'Profile',
  ArtifactListView: 'Artifact List',
  DropView: 'Drop Artifact',
  CameraView: 'Camera',
  CameraRollView: 'Camera Roll',
  SubmitImageView: 'Submit Artifact'
};

// NavBar Routes
const NavigationBarRouteMapper = {
  Title: (route, navigator, index, navState) => {
    let title = TITLES[route.name];
    return (<Text style={styles.title}>{title}</Text>); 
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
    return null;
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
    fontSize: 20,
    padding: 10
  },
  back: {
    fontSize: 20,
    color: '#03a9f4',
    padding: 10
  }
});

// container component
class quest extends Component {
  constructor(props) {
    super(props)
    this.dbRef = firebaseApp.database().ref(),
    this.storageRef = firebaseApp.storage().ref() 
  }

  renderScene(route, navigator) {
    let Component = ROUTES[route.name];
    let path = route.path || null;
    let base64 = route.base64 || null;
    return (
      <Component
        route={route}
        path={path}
        base64={base64}
        dbRef={this.dbRef}
        storageRef={this.storageRef}
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
