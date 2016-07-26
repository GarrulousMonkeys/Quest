import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  AlertIOS,
  StyleSheet,
  Text,
  Image,
  NativeModules,
  View,
  NavigatorIOS,
  TouchableHighlight,
  TouchableWithoutFeedback,
  MapView
} from 'react-native';

const styles = StyleSheet.create({
  mapContainer: {
    flex:1
  }, 
  bottomNav: { 
    flex:2,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#48BBEC',
    fontSize: 18,
    textAlign: 'center'
  },
  map: {
    height:400,
    flex: 5
  },
  bottomNavButton: {
    flex:1,
    backgroundColor: "#FFF",
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#48BBEC',
    padding: 10,
    margin: 2
  }
});

class MainMapView extends Component {

  constructor(props) {
    super(props)

    //Initialize the map center point and zoom level to San Francisco.
    //Annotations will be set to a different value in componentDidMount().
    this.state = {
      region: {
        latitude: 37.74825,
        longitude: -122.4224,
        latitudeDelta: 0.1922,
        longitudeDelta: 0.0421
      }, 
      annotations : []
    } 
  }

  componentDidMount() {

    //Register a listener to the Firebase database reference.
    //The listener grabs all data in the db at initialization, and picks up any database updates.
    //The event listener returns a value "snapshot" from Firebase, which is a current snapshot of the db.
    this.props.dbRef.on('value', (snapshot) => {

      var parsedItems = [];
      snapshot.forEach((rawArtifact) => {
        var artifact = rawArtifact.val();

        //Transform objects from Firebase into objects that the MapView is expecting.
        parsedItems.push({
          latitude: artifact.latitude,
          longitude: artifact.longitude,
          title: artifact.user,
          subtitle: artifact.message
        });
      });

      //Update State.
      this.setState({
        annotations: parsedItems
      });

    });
  }
  
  componentWillUnmount() {
    //Unregister the db reference listener when the user navigates away from this view.
    //This is necessary because otherwise the view will attemt to call setState after the component gets unmounted, which causes a warning.
     this.props.dbRef.off();
   }


  _handleNextPage(componentName) {
    this.props.navigator.push({name: componentName});
  }

   //In the MapView component, pins are represented by elements in the annotations array.
  render() {
    return (
      <View style={styles.mapContainer}>
          <MapView
          style={styles.map}
          showsUserLocation={true}
          region={this.state.region}
          annotations={this.state.annotations}
          />
          <View style={styles.bottomNav}>

            <TouchableWithoutFeedback onPress={() => this._handleNextPage('ProfileView')}>
              <View style={styles.bottomNavButton}>
                <Text style={styles.buttonText}>Profile</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this._handleNextPage('CameraView')}>
              <View style={styles.bottomNavButton}>
                <Text style={styles.buttonText}>Add Artifact</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this._handleNextPage('ArtifactListView')}>
              <View style={styles.bottomNavButton}>
                <Text style={styles.buttonText}>List View</Text>
              </View>
            </TouchableWithoutFeedback>

          </View>
      </View>
    );
  }
}

export {MainMapView};