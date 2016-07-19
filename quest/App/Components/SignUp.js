import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

import { SignIn } from './SignIn';
import { MapViewContainer } from './MapViewContainer';


var styles = StyleSheet.create({
  mainContainer: { flex: 1,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center'},

  title: { fontSize: 60,
    paddingBottom: 40,
    textAlign: 'center',
    fontFamily: 'Bodoni 72 Smallcaps',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white' },


  searchInput: {
    height: 50,
    padding: 10,
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
    fontSize: 23,
    borderWidth: 2,
    flexDirection: 'row',
    borderColor: 'white',
    // borderRadius: 8,
    color: 'white'
  },

  buttonText: {
    fontSize: 18,
    color: '#000',
    alignSelf: 'center'
  },

  bgImage: { flex: 1,
    justifyContent: 'center',
    // alignItems: 'stretch',
    resizeMode: 'cover'
  },

  button: {
    height: 45,
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  signIn: {
    color: 'white',
    padding: 10,
    textAlign: 'center'
  }
});

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error: false
    }
  }

  _handleChangeField(e) {
    this.setState({
      username: e.nativeEvent.text
    })
  }

  _handleChangePage(title, component) {
    //this.props.toggleNavBar();
    this.props.navigator.push({
      title: title,
      component: component,
      passProps: {
        //toggleNavBar: this.props.toggleNavBar,
      }
    });
  }

  render() {
    return (
      // <View style={styles.mainContainer}>
      <Image style={styles.bgImage} source={{uri: 'https://media.giphy.com/media/IuKnqFMhtcA2A/giphy.gif'}}>
        <Text style={styles.title}>Quest</Text>
        <TextInput style={styles.searchInput} onChange={this._handleChangeField.bind(this)} placeholder='username'/>
        <TextInput style={styles.searchInput} placeholder='password'/>
        <TouchableHighlight style={styles.button} underlayColor='black'>
          <Text style={styles.buttonText} onPress={()=>this._handleChangePage('Map View', MapViewContainer)}>SIGN UP</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>this._handleChangePage('Sign in', SignIn)}><Text style={styles.signIn}>Already have an account? Sign in here!</Text></TouchableHighlight>
        </Image>
      // </View>
    )
  }
}

export { SignUp };