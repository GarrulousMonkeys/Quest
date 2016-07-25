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
    marginTop: 60,
    flex:1
  }, 
  rowContainer: {
    padding: 10,
    flexDirection: 'row'
  },
  imageContainer: {
    margin: 3,
    flex: 2,
    alignItems: 'stretch'
  },
  contentContainer: {
    margin: 3,
    flex: 3,
    justifyContent: 'center'
  },
  listImage: {
    height: 75
  },
  listText: {
    fontSize: 17 
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
          renderRow={(rowData) => {
            return (
              <View style={styles.rowContainer}>
                <View style={styles.imageContainer}>
                  <Image source={{uri: rowData.imagePath}} style={styles.listImage} />
                </View>
                <View style={styles.contentContainer}>
                  <Text style={styles.listText}>{rowData.name}</Text>
                  <Text style={styles.listText}>{rowData.text}</Text>
                  <Text style={styles.listText}>{rowData.date}</Text>
                </View>
              </View>
            );
          }
        }/>
      </View>
    );
  }
}

export { ArtifactListView };