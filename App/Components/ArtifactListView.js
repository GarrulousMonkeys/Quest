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
    //ds and dataSource are required to instatiate a ListView component
    //The argument to ListView.DataSource below is boiler-plate provided by React-Native documentation.
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([{}])
    };
  }

  componentDidMount() {

    //Register a listener to the Firebase database reference.
    //The listener grabs all data in the db at initialization, and picks up any database updates.
    //The event listener returns a value "snapshot" from Firebase, which is a current snapshot of the db.
    this.props.dbRef.on('value', (snapshot) => {
      let parsedItems = [];

      snapshot.forEach((rawArtifact) => {
        let artifact = rawArtifact.val();

        //Transform data from Firebase into objects the ListView is expecting
          parsedItems.push({
            name: artifact.user,
            date: artifact.timestamp,
            text: artifact.message,
            imagePath: artifact.base64
          });

      });

      //Sort by timestamp in descending (reverse chronological) order.
      parsedItems.sort((a, b) => {
        if(a.date > b.date) {
          return -1;
        }
        if(a.date < b.date) {
          return 1;
        }
        return 0;  
      });

      //Convert dates from UNIX timestamps to human-readable.
      parsedItems.forEach((item) => {
        let stringDate = (new Date(item.date)).toString().substring(0, 24);
        item.date = stringDate;
      });

      //Update State.
      this.setState({
        dataSource: this.ds.cloneWithRows(parsedItems)
      });
      
    });
  }

  componentWillUnmount() {
    //Unregister the db reference listener when the user navigates away from this view.
    //This is necessary because otherwise the view will attemt to call setState after the component gets unmounted, which causes a warning.
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