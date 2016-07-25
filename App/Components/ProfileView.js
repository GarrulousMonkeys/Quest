import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
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
  image: {
    backgroundColor: 'white',
    height: 145,
    width: 145,
    borderRadius: 30,
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
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#ef5350',
  }
})

class ProfileView extends Component {
  
  constructor(props) {
    super(props);
    this.user = firebase.auth().currentUser;
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([{}])
    }
  }

  componentDidMount() {

    this.props.dbRef.orderByChild("user")
      .equalTo(this.user.displayName)
      .on('value', (snapshot) => {
        
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

  _handleLogOut() {
    firebase.auth().signOut().then(() => {
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
          source={{uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/1685-200.png'}} />
        <Text style={styles.name}> {this.user.displayName} </Text>
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
          initialListSize={3}
          scrollRenderAheadDistance={3}
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

export { ProfileView };