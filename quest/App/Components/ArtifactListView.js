import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  Image,
  NativeModules,
  View,
  NavigatorIOS,
  TouchableWithoutFeedback
} from 'react-native';

class ArtifactListView extends Component {
  
  constructor(props) {
    super(props)

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([
        {name: 'Loading...', date: 'Loading...', text:'Loading...', imagePath: 'https://firebasestorage.googleapis.com/v0/b/quest-59bd0.appspot.com/o/images%2Fimage1.jpg?alt=media&token=67db7111-57eb-4a13-99d0-35d5865db2d6'}
      ])
    };
  }

  componentDidMount() {

    this.props.dbRef.on('value', (snapshot) => {
      var parsedItems = [];

      snapshot.forEach((rawArtifact) => {
        var artifact = rawArtifact.val();

        this.props.storageRef.child('images/' + artifact.artifactID + '.jpg').getDownloadURL().then(function(url) {

          parsedItems.push({
            name: artifact.user,
            date: (new Date(artifact.timestamp)).toString().substring(0, 24),
            text: artifact.message,
            imagePath: url
          });

        this.setState({
            dataSource: this.ds.cloneWithRows(parsedItems)
          });

        }.bind(this)).catch(function(error) {
          console.log(error);
        });

      });
    });
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


