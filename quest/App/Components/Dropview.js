import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableWithoutFeedback,
	AlertIOS
} from 'react-native';

class Dropview extends Component {
	constructor(props){
		super(props)
		this.state = {
			text: ''
		}
	}

  componentDidMount() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var initialPosition = position;
          this.setState({initialPosition: initialPosition});
        },
        (error) => alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
      navigator.geolocation.watchPosition((position) => {
        var lastPosition = position;
        this.setState({lastPosition: lastPosition});
      });
  }

	sendArtifact() {

		//the JSON object sent to Firebase below contains text, geolocation, username, and a timestamp
		this.props.dbRef.push({ message: this.state.text, user: "Test User", latitude: this.state.lastPosition.coords.latitude,longitude: this.state.lastPosition.coords.longitude, timestamp: Date.now()}, function() { AlertIOS.alert('New message posted!')});
		
		//image file upload code started here:
		/*
		var imageDestinationPath = this.props.storageRef.child('images/file.jpg');
		var localFile = //need reference to image file on iPhone disk here
		var metadata = {
			username: undefined,
			artifactID: undefined,
		};
		var uploadTask = imageDestinationPath.put(localFile, metadata)
		//Reference for photo uploading: 
		//https://github.com/firebase/quickstart-js/blob/master/storage/index.html
		*/
	
	}
	
	render() {
		return (
			<View style={styles.container}>
				<TextInput style={styles.textInput}
					onChangeText={(text) => this.setState({text})}
					placeholder='Type artifact text here'
					value={this.state.text}
				/>

			<TouchableWithoutFeedback onPress={() => this.sendArtifact()}>
              <View>
                <Text>Button: Submit Test</Text>
              </View>
            </TouchableWithoutFeedback>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'aqua',
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	textInput: {
		flex: 1,
		flexDirection: 'row'
	}
});

export { Dropview }