//NOTE: This component is not being used but is build to just send messages to the database

// import React, { Component } from 'react';
// import {
// 	StyleSheet,
// 	Text,
// 	View,
//   TouchableHighlight,
// 	TextInput,
// 	TouchableWithoutFeedback,
// 	AlertIOS
// } from 'react-native';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     justifyContent: 'flex-end',
//   },
//   textInput: {
//     flex: 1,
//     fontSize: 30,
//     padding: 10,
//     paddingTop: 200,
//     textAlign: 'center',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   bottomNavButton: {
//     flex: 1,
//     backgroundColor: "#24CE84",
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     padding: 30,
//     paddingTop:100
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 30
//   }
// });

// class DropView extends Component {
// 	constructor(props){
// 		super(props)
// 		this.state = {
// 			text: ''
// 		}
// 	}

//   componentDidMount() {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           var initialPosition = position;
//           this.setState({initialPosition: initialPosition});
//         },
//         (error) => alert(error.message),
//         {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
//       );
//       navigator.geolocation.watchPosition((position) => {
//         var lastPosition = position;
//         this.setState({lastPosition: lastPosition});
//       });
//   }

//   componentWillUnmount() {
//      this.props.dbRef.off();
//    }

// 	sendArtifact() {
// 		this.props.dbRef.push({ message: this.state.text, user: "Test User", latitude: this.state.lastPosition.coords.latitude,longitude: this.state.lastPosition.coords.longitude, timestamp: Date.now()}, function() { AlertIOS.alert('New message posted!')});
		
// 	 this.props.navigator.popToTop();
// 	}
	
// 	render() {
// 		return (
// 			<View style={styles.container} >

//         <TouchableHighlight onPress={() => this.sendArtifact()}>
//           <View style={styles.bottomNavButton}>
//             <Text style={styles.buttonText}>SUBMIT ARTIFACT</Text>
//           </View>
//         </TouchableHighlight>
//   				<TextInput multiline={true} style={styles.textInput}
//   					onChangeText={(text) => this.setState({text})}
//   					placeholder='Type artifact text here'
//   					value={this.state.text}
//   				/>
// 			</View>
// 		)
// 	}
// }

// export { DropView };