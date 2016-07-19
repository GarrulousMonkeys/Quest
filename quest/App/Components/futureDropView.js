import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput
} from 'react-native';

class Dropview extends Component {
	constructor(props){
		super(props)
		this.state = {
			text: ''
		}
	}
	render() {
		return {
			<View style={styles.container}>
				<Text>Artifact</Text>
				<TextInput
					onChangeText={(text) => this.setState({text})}
					placeholder='Type artifact text here'
					value={this.state.text}
				/>
			</View>
		}
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'blue',
		padding: 20
	}
});

export {Dropview}