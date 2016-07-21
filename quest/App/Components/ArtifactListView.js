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

class ArtifactListView extends Component {
  
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        {name: 'Joel Smith', date: 'July 14, 2016 2:36pm', text:'best icecream ever at birite', imagePath: 'https://firebasestorage.googleapis.com/v0/b/quest-59bd0.appspot.com/o/images%2Fimage1.jpg?alt=media&token=67db7111-57eb-4a13-99d0-35d5865db2d6'},
        {name: 'James Buchanan', date: 'July 14, 2016 11:31am', text:'sunny day at dolores = <3 <3 <3', imagePath: 'https://firebasestorage.googleapis.com/v0/b/quest-59bd0.appspot.com/o/images%2Fimage2.jpg?alt=media&token=155db632-74e2-4811-98a8-09c599229df0'},
        {name: 'John Wilson', date: 'July 15, 2016 10:04am', text:'Dolores park is awesome', imagePath: 'https://firebasestorage.googleapis.com/v0/b/quest-59bd0.appspot.com/o/images%2Fimage3.png?alt=media&token=89b366ea-1b02-4bfb-bc12-7af37be66f86'}
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

export {ArtifactListView}


