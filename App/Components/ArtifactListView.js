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

const styles = StyleSheet.create({
  container: {
    marginTop: 44,
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

class ArtifactListView extends Component {
  
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([{}])
    };
  }

  componentDidMount() {

    this.props.dbRef.on('value', (snapshot) => {
      let parsedItems = [];

      snapshot.forEach((rawArtifact) => {
        let artifact = rawArtifact.val();

          parsedItems.push({
            name: artifact.user,
            date: artifact.timestamp,
            text: artifact.message,
            imagePath: artifact.base64
          });

      });

      parsedItems.sort((a, b) => {
        if(a.date > b.date) {
          return -1;
        }
        if(a.date < b.date) {
          return 1;
        }
        return 0;  
      });

      parsedItems.forEach((item) => {
        let stringDate = (new Date(item.date)).toString().substring(0, 24);
        item.date = stringDate;
      });

      this.setState({
        dataSource: this.ds.cloneWithRows(parsedItems)
      });
      
    });
  }

  componentWillUnmount() {
     this.props.dbRef.off();
   }

  render() {

    return (
      <View style={styles.container}>
        <ListView ref="listView" style={styles.list} 
        dataSource={this.state.dataSource}
        initialListSize={3}
        scrollRenderAheadDistance={3}
        renderRow={(rowData) => 
          <View style={styles.listItem}>
            <View><Image source={{uri: rowData.imagePath}} style={styles.listImage} /></View>
            <Text>{rowData.text}</Text>
            <Text>{rowData.name}</Text>
            <Text>{rowData.date}</Text>
          </View> 
        } />
      </View>
    );
  }
}

export {ArtifactListView}


