import React, { Component } from 'react';
import { MapViewContainer } from './MapViewContainer';
import {
  AppRegistry,
  ScrollView,
  ListView,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

class Profile extends Component {
  
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    
    this.state = {
     dataSource: ds.cloneWithRows([
        {name: 'Joel Smith', date: 'July 14, 2016 2:36pm', text:'best icecream ever at birite', imagePath: 'https://cdn1.vox-cdn.com/uploads/chorus_image/image/47931859/C_CitySFDoloresPkLg.0.jpg'},
        {name: 'Joel Smith', date: 'July 14, 2016 2:36pm', text:'best icecream ever at birite', imagePath: 'https://cdn1.vox-cdn.com/uploads/chorus_image/image/47931859/C_CitySFDoloresPkLg.0.jpg'},
        {name: 'Joel Smith', date: 'July 14, 2016 2:36pm', text:'best icecream ever at birite', imagePath: 'https://cdn1.vox-cdn.com/uploads/chorus_image/image/47931859/C_CitySFDoloresPkLg.0.jpg'},
        {name: 'Joel Smith', date: 'July 14, 2016 2:36pm', text:'best icecream ever at birite', imagePath: 'https://cdn1.vox-cdn.com/uploads/chorus_image/image/47931859/C_CitySFDoloresPkLg.0.jpg'},
        {name: 'Joel Smith', date: 'July 14, 2016 2:36pm', text:'best icecream ever at birite', imagePath: 'https://cdn1.vox-cdn.com/uploads/chorus_image/image/47931859/C_CitySFDoloresPkLg.0.jpg'},
        {name: 'Joel Smith', date: 'July 14, 2016 2:36pm', text:'best icecream ever at birite', imagePath: 'https://cdn1.vox-cdn.com/uploads/chorus_image/image/47931859/C_CitySFDoloresPkLg.0.jpg'},
        {name: 'Joel Smith', date: 'July 14, 2016 2:36pm', text:'best icecream ever at birite', imagePath: 'https://cdn1.vox-cdn.com/uploads/chorus_image/image/47931859/C_CitySFDoloresPkLg.0.jpg'},
        {name: 'Joel Smith', date: 'July 14, 2016 2:36pm', text:'best icecream ever at birite', imagePath: 'https://cdn1.vox-cdn.com/uploads/chorus_image/image/47931859/C_CitySFDoloresPkLg.0.jpg'},
        {name: 'Joel Smith', date: 'July 14, 2016 2:36pm', text:'best icecream ever at birite', imagePath: 'https://cdn1.vox-cdn.com/uploads/chorus_image/image/47931859/C_CitySFDoloresPkLg.0.jpg'}
      ])
    }
  }

  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <Image style={styles.image} source={{uri: 'https://www.petfinder.com/wp-content/uploads/2012/11/152132425-newly-adopted-dog-632x475.jpg'}} />
        <Text style={styles.name}> Joel Smith </Text>
        <Text style={styles.artifacts}> Number of Artifacts: 9 </Text>
      </View>
    );
  }

  render() {

    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      uid = user.uid;

      // The user's ID, unique to the Firebase project. Do NOT use this value to authenticate with your backend server, if you have one. Use User.getToken() instead.
      console.log('name', name);
      console.log('email', email);
      console.log('photoUrl', photoUrl);
      console.log('uid', uid);
    }



    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderHeader={this.renderHeader}
          renderRow={(rowData) => {
            return (
              <View style={styles.rowContainer}>
                <View style={styles.contentContainer}>
                  <Image source={{uri: rowData.imagePath}} style={styles.listImage} />
                  <Text>{rowData.name}</Text>
                  <Text>{rowData.text}</Text>
                  <Text>{rowData.date}</Text>
                </View>
              </View>
            );
          }
        }/>
      </View>
    ); 
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer: {
    paddingTop: 10,
    marginTop: 10
  },
  contentContainer: {
    margin: 5,
    alignItems: 'stretch'
  },
  listImage: {
     height: 200
  },
  headerContainer: {
    backgroundColor: '#48BBEC',
    paddingBottom: 10
  },
  name: {
    alignSelf: 'center',
    fontSize: 21,
    marginTop: 10,
    marginBottom: 5,
    color: 'white'
  },
  artifacts: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white'
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 65,
    marginTop: 10,
    alignSelf: 'center'
  }
})

export { Profile };

// firebase.auth().signOut().then(function() {
//   // Sign-out successful.
// }, function(error) {
//   // An error happened.
// });