import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

class ProfileView extends Component {
  
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

  _handleLogOut() {
    firebase.auth().signOut().then(() => {
      console.log('bye');

      this.props.navigator.resetTo({name: 'SignInView'});

    },(error) => {
      console.log(error);
    });
  }

  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <Image 
          style={styles.image} 
          source={{uri: 'https://www.petfinder.com/wp-content/uploads/2012/11/152132425-newly-adopted-dog-632x475.jpg'}} />
        <Text style={styles.name}> Joel Smith </Text>
        <Text style={styles.artifacts}> Number of Artifacts: 9 </Text>
        <TouchableHighlight 
          style={ styles.button }
          underlayColor='gray'
          onPress={ this._handleLogOut.bind(this) }>
          <Text style={ styles.logout }>logout</Text>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderHeader={this.renderHeader.bind(this)}
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
    marginTop: 60,
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
    fontSize: 22,
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
  },
  logout: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 20,
    color: 'white'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    backgroundColor: '#ef5350',
  }
})

export { ProfileView };