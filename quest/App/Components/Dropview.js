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

	sendArtifact() {
		this.props.dbRef.push({ message: this.state.text, user: "Test User", timestamp: Date.now()}, function() { AlertIOS.alert('New message posted!')});
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