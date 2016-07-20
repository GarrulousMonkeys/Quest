import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import { SignUp } from './SignUp';
import { MapViewContainer } from './MapViewContainer';



const styles = StyleSheet.create({
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
    color: 'white'
  },

  buttonText: {
    fontSize: 18,
    color: '#000',
    alignSelf: 'center'
  },

  bgImage: { flex: 1,
    justifyContent: 'center',
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
  signUp: {
    color: 'white',
    padding: 10,
    textAlign: 'center'
  }
});

class SignIn extends Component {
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
    this.props.navigator.push({
      title: title,
      component: component,
      passProps: {
        dbRef: this.props.dbRef,
        storageRef: this.props.storageRef
      }
    });
  }
  render() {
    return (
      <Image style={styles.bgImage} source={{uri: 'https://media.giphy.com/media/XWlS8OnV0KEBW/giphy.gif'}}>
        <Text style={styles.title}>Quest</Text>
        <TextInput style={styles.searchInput} onChange={this._handleChangeField.bind(this)} placeholder='username'/>
        <TextInput style={styles.searchInput} placeholder='password'/>
        <TouchableHighlight style={styles.button}>
          <Text style={styles.buttonText} onPress={()=>this._handleChangePage('Map View', MapViewContainer)} underlayColor='black'>SIGN IN</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>this._handleChangePage('Sign Up', SignUp)}><Text style={styles.signUp}>Don't have an account? Sign up here!</Text></TouchableHighlight>
        </Image>
    )
  }
}

export { SignIn };