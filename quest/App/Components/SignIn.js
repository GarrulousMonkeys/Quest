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
  mainContainer: { 
    flex: 1,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: { 
    fontSize: 60,
    paddingBottom: 40,
    textAlign: 'center',
    fontFamily: 'Bodoni 72 Smallcaps',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white' 
  },
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
  },
  error: {
    color: '#ef5350',
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  }
});

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: ''
    }
  }

  _handleChangePage(title, component) {
    console.log('this.props.dbRef', this.props.dbRef);
    console.log('this.props.storageRef', this.props.storageRef);
    this.props.navigator.push({
      title: title,
      component: component,
      passProps: {
        dbRef: this.props.dbRef,
        storageRef: this.props.storageRef
      }
    });
  }

  _handleSignIn() {
    let email = this.state.email.trim();
    let password = this.state.password;

    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log('Error Code:', error.code);
        console.log('Error Message:', error.message);
        this.setState({error: error.message});
    });

    this._handleAuth();
    
    this.setState({
      email: '',
      password: ''
    });

  }

  _handleAuth(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this._handleChangePage('Map View', MapViewContainer);
      }
    });
  }

  render() {

    this._handleAuth();

    return (
      <Image style={ styles.bgImage } 
        source={ {uri: 'https://media.giphy.com/media/XWlS8OnV0KEBW/giphy.gif'} }>
        <Text style={ styles.title }>Quest</Text>
        <TextInput 
          style={ styles.searchInput }
          value ={ this.state.email }
          onChangeText={ (email) => this.setState( {email}) } 
          placeholder='email'/>
        <TextInput 
          style={ styles.searchInput }
          secureTextEntry={ true }
          value ={ this.state.password }
          onChangeText={ (password) => this.setState( {password}) }
          placeholder='password'/>
        <TouchableHighlight 
          style={ styles.button }
          underlayColor='gray'
          onPress={ this._handleSignIn.bind(this) }>
          <Text style={ styles.buttonText } >SIGN IN</Text>
        </TouchableHighlight>
        <TouchableHighlight 
          onPress={ ()=>this._handleChangePage('Sign Up', SignUp) }>
          <Text style={ styles.signUp }>
            Don't have an account? Sign up here!
          </Text>
        </TouchableHighlight>
        <Text style={styles.error}>{this.state.error}</Text>
      </Image>
    );
  }
}

export { SignIn };