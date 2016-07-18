import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  Image,
  View,
  NavigatorIOS,
  TouchableWithoutFeedback
} from 'react-native';

var MapViewContainer = require('./MapView')

class ArtifactList extends Component {
  
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
       {name: 'Joel Smith', date: 'July 14, 2016 2:36pm', text:'best icecream ever at birite', imagePath: 'https://cdn1.vox-cdn.com/uploads/chorus_image/image/47931859/C_CitySFDoloresPkLg.0.jpg'},
        {name: 'James Buchanan', date: 'July 14, 2016 11:31am', text:'sunny day at dolores = <3 <3 <3', imagePath: 'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/12328107_1060282894027950_465354902_n.jpg'},
        {name: 'John Wilson', date: 'July 15, 2016 10:04am', text:'Dolores park is awesome', imagePath: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Mission_San_Francisco_de_Asis.PNG'}
        ])
    }
  }

  _handleChangePage() {
    //this.props.toggleNavBar();
    this.props.navigator.push({
      title: "Map View",
      component: MapViewContainer,
      passProps: {
        //toggleNavBar: this.props.toggleNavBar,
      }
    });

  }

  render() {

    return (

      <View style={styles.container}>
      
        <TouchableWithoutFeedback style={styles.listViewButton} onPress={this._handleChangePage}>
          <View>
            <Text>Go to Map View</Text>
          </View>
        </TouchableWithoutFeedback>


          <ListView ref="listView" style={styles.list} 
          dataSource={this.state.dataSource}
          initialListSize={3}
          scrollRenderAheadDistance={10}
          renderRow={(rowData) => 
            <View style={styles.listItem}>
              <View><Image source={{uri: rowData.imagePath}} style={styles.listImage} /></View>
              <Text>{rowData.text}</Text>
              <Text>{rowData.name}</Text>
              <Text>{rowData.date}</Text>
            </View> 
          } 
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    paddingTop:20
  }, 
  list: {
    flex:1
  }, 
  listViewButton: {
    flex:1,
    paddingTop:20,
    marginTop: 20
  },
  listImage: {
    width:380,
    height:169
  }, 
  listItem: {
    borderWidth: 0.5, 
    borderColor: '#d6d7da'
  }
});

module.exports = ArtifactList;