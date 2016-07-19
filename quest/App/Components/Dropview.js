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
		return (
			<View style={styles.container}>
				<TextInput style={styles.textInput}
					onChangeText={(text) => this.setState({text})}
					placeholder='Type artifact text here'
					value={this.state.text}
				/>
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