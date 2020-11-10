import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Alert,
  View,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import Loading from './Loading';

export default class ScanScreen extends Component {

  state = {
    isLoading: false,
  }

  onSuccess = (e) => {

    var barcode_new = e.data.split(":");
    //var lastBarcode = barcode_new[barcode_new.length - 2].trim()
    //Alert.alert('Warning', JSON.stringify(barcode_new))

    for (i = 0; i < barcode_new.length; i++) {
      const textMacch = barcode_new[i].trim()
      if (textMacch.indexOf("Employer Id") >= 0) {
        //Alert.alert('Warning', JSON.stringify(barcode_new[i+1].trim()))
        this.webServiceCalling(1, barcode_new[i + 1].trim())
      } else if (textMacch.indexOf("Jobpost Id") >= 0) {
        //Alert.alert('Warning', JSON.stringify(barcode_new[i+1].trim()))
        this.webServiceCalling(0, barcode_new[i + 1].trim())
      }
    }
  }

  webServiceCalling = (typeOfPost, barCodeText) => {
    this.setState({ isLoading: true });
    this.fetchBarcodeData(typeOfPost, barCodeText)
      .catch(() => {
        this.setState({ isLoading: false });
        setTimeout(function () {
          Alert.alert('Warning', 'No internet connection')
        }.bind(this), 1)
      })
      .then((data) => {
        console.log('data:- ', data.success);
        this.setState({ isLoading: false });
        if (parseInt(data.success) == 1) {
          this.props.navigation.navigate('JobListing', { jobListArray: data.details })
        } else {
          setTimeout(function () {
            Alert.alert('Error', 'error during processing.')
          }.bind(this), 1)
        }
      });
  }

  async fetchBarcodeData(typeOfPost, barCodeText) {

    var urlHaveToPost = ""
    var postData = new FormData();
    if (parseInt(typeOfPost) == 1) {
      urlHaveToPost = "http://ijobs.shop/webservice/qrcode_scan.php"
      postData.append('employer_id', barCodeText);
    } else {
      urlHaveToPost = "http://ijobs.shop/webservice/qrcode_job_post.php"
      postData.append('jobpost_id', barCodeText);
    }

    console.log('Post Data :- ', postData);

    const response = await fetch(urlHaveToPost, {
      method: 'POST',
      body: postData,
    });

    try {
      const json = await response.json();
      console.log(json);     // <-- (5) [Object, Object, Object, Object, Object]
      return json;
    }
    catch (e) {
      console.log('caught error', e);
      Alert.alert('Warning', e)
    }
  }

  static navigationOptions = ({ navigation }) => ({

    title: 'Scan QR Code',
    headerStyle: {
      headerBackTitle: null,
      backgroundColor: '#2fa1f7',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 25,
      fontWeight: 'normal',
      //fontWeight: 'bold',
      textAlign: 'center',
      alignSelf: 'center',
      flex: 1,
      fontFamily: 'Lobster-Regular',
    },
    headerRight: (<View></View>),
  });

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.View_1dropDown}>
          <QRCodeScanner
            onRead={this.onSuccess}
            showMarker={true}
          />
        </View>
        {this.state.isLoading ? <Loading /> : null}
      </SafeAreaView>


    );
  }
}

const styles = StyleSheet.create({
  View_1dropDown: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    //alignItems: 'stretch',
    //marginTop: 0,
    backgroundColor: 'black',
    marginTop: 0,
    marginBottom: 0,
  },

});