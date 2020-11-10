import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import BottomViewClass from './BottomView';
import Loading from './Loading';

class DashBoard extends React.Component {

  state = {
    isLoading: false,
  }

  _logOutClick = () => {

    if (this.checkUserLogin()) {
      Alert.alert(
        '',
        'Are you sure want to log out?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => this.props.navigation.navigate('Home')
          },
        ],
        { cancelable: false },
      );
    } else {
      this.props.navigation.navigate('Home', {})
    }

  }

  _bellNotificationClick = () => {
    if (this.checkUserLogin()) {
      this.props.navigation.navigate('NotificationList')
    } else {
      this.props.navigation.navigate('Home', {})
    }
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleLogOut: this._logOutClick });
    this.props.navigation.setParams({ handleNotification: this._bellNotificationClick });
  }

  goToJobbyCategoryPage = () => {
    this.props.navigation.navigate('JobByCat', {})
  }

  goToWebViewPage_From_UploadCV = () => {
    if (this.checkUserLogin()) {
      this.props.navigation.navigate('CusWebView', { pageName: 'Upload CV', pageUrl: 'http://ijobs.shop/upload-docs.php?varName=' + this.props.appdata.userDetails[0].job_seeker_id })
    } else {
      this.props.navigation.navigate('Home', {})
    }
  }

  goToWebViewPage_From_ShareMyProfile = () => {
    if (this.checkUserLogin()) {
      this.props.navigation.navigate('CusWebView', { pageName: 'Share My Profile', pageUrl: 'http://ijobs.shop/public-profile.php?source=' + this.props.appdata.userDetails[0].job_seeker_id })
    } else {
      this.props.navigation.navigate('Home', {})
    }

  }

  goToProfilePage = () => {
    if (this.checkUserLogin()) {
      this.props.navigation.navigate('Profile', {})
    } else {
      this.props.navigation.navigate('Home', {})
    }
  }

  goToEditProfilePage = () => {
    if (this.checkUserLogin()) {
      this.props.navigation.navigate('EditProfile', {})
    } else {
      this.props.navigation.navigate('Home', {})
    }
  }

  goToQRCodePage = () => {
    if (this.checkUserLogin()) {
      this.props.navigation.navigate('QRCodeScanner', {})
    } else {
      this.props.navigation.navigate('Home', {})
    }
  }

  checkUserLogin = () => {
    if (this.props.appdata.userDetails.length == 0) {
      return false
    } else {
      return true
    }
  }


  getJobByLocationData = () => {

      this.setState({ isLoading: true });
      this.getJobLocationData()
        .catch(() => {
          this.setState({ isLoading: false });
          setTimeout(function () {
            Alert.alert('Warning', 'No internet connection')
          }.bind(this), 1)
        })
        .then((data) => {
          console.log('data:- ', data);
          this.setState({ isLoading: false });
          if (parseInt(data.success) == 1) {
            this.props.navigation.navigate('JobListing', { jobListArray: data.details })
          } else if (parseInt(data.success) == 0) {
            setTimeout(function () {
              Alert.alert('Warning', data.details)
            }.bind(this), 1)
          } else {
            setTimeout(function () {
              Alert.alert('Error', 'error during processing.')
            }.bind(this), 1)
          }
        });
  }

  async getJobLocationData() {

    var postData = new FormData();

    postData.append('job_status', "Open");
    postData.append('jobpost_status', "A");
    postData.append('country', this.props.appdata.userDetails.length == 0 ? "" : this.props.appdata.userDetails[0].job_seeker_country_name);
    postData.append('state', this.props.appdata.userDetails.length == 0 ? "" : this.props.appdata.userDetails[0].job_seeker_state_name);

    console.log('Post Data :- ', postData);

    const response = await fetch("http://ijobs.shop/webservice/search_job.php", {
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

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'DashBoard',
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
      
      headerRight: (<TouchableOpacity style={{ justifyContent: 'center', }} onPress={() => params.handleLogOut()}>
      <Image
        source={require('../images/logout.png')}
        style={{ width: 40, height: 40, marginRight: 10, alignSelf: 'center', }}
        resizeMode='center'
      />
    </TouchableOpacity>),
      headerLeft: (<TouchableOpacity style={{ justifyContent: 'center', }} onPress={() => params.handleNotification()}>
        <Image
          source={require('../images/bell.png')}
          style={{ width: 40, height: 40, marginLeft: 10, alignSelf: 'center', }}
          resizeMode='center'
        />
      </TouchableOpacity>),
    };
  };

  render() {
    const { navigate } = this.props.navigation;
    //console.log("DashBoard props ===>>>> ", JSON.stringify(this.props))
    return (
      <Fragment>
        <ImageBackground
          //source={require('../images/blueGradient.png')}
          style={{ position: 'absolute', left: 0, right: 0, width: '100%', height: '100%', backgroundColor: '#f2f4f7' }}
          resizeMode='cover'
        ></ImageBackground>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.MainContainer} >
            <View style={{
              height: 100, backgroundColor: '#2fa1f7',
              alignItems: 'center',
              flexDirection: 'row',
            }}
            >
              <View style={{
                backgroundColor: '#f7990c',
                width: 90,
                marginLeft: 30,
                borderRadius: 45,
                borderColor: 'white',
                borderWidth: 5,
                overflow: 'hidden',

              }} >

                <Image
                  source={this.props.appdata.userImage_Profile.uri == "" ? require('../images/userProfile.png') : this.props.appdata.userImage_Profile}
                  style={{ width: 80, height: 80, alignSelf: 'center' }}
                  resizeMode='cover'
                />
              </View>
              <View style={{
                flex: 1,
                marginLeft: 20,
                marginRight: 20,
              }} >

                <Text style={styles.Lbl_DB_Heading_1_Text}>{this.props.appdata.userDetails.length == 0 ? "Unknow" : this.props.appdata.userDetails[0].job_seeker_name}</Text>
                <Text style={styles.Lbl_DB_Heading_2_Text}>{this.props.appdata.userDetails.length == 0 ? "" : "User Id:" + this.props.appdata.userDetails[0].job_seeker_id}</Text>

              </View>
            </View>

            <ImageBackground style={{
              height: 40, //backgroundColor: '#2fa1f7',
              alignItems: 'center',
              flexDirection: 'row',
            }}
              source={require('../images/waveImg.png')}
              resizeMode='stretch'
            ></ImageBackground>


            <View style={{
              flex: 1,
              margin: 10,
              //backgroundColor: 'red',
              alignItems: 'flex-start',
              flexDirection: 'row',
            }} >
              <ScrollView style={{ flex: 1 }}
                bounces={false}>

                <View style={styles.View_Box}>

                  <TouchableOpacity style={[styles.gridItem]} onPress={() => this.goToProfilePage()}>
                    <View style={[styles.img_Grid]}>
                      <Image
                        source={require('../images/profile.png')}
                        style={{ width: '60%', height: '60%' }}
                        resizeMode='center'
                      />
                    </View>
                    <Text style={styles.Lbl_Grid}>My Account</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.gridItem]} onPress={() => this.goToEditProfilePage()}>
                    <View style={[styles.img_Grid]}>
                      <Image
                        source={require('../images/editProfile.png')}
                        style={{ width: '60%', height: '60%' }}
                        resizeMode='center'
                      />
                    </View>
                    <Text style={styles.Lbl_Grid}>Edit Profile</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.gridItem]} onPress={() => this.getJobByLocationData()}>
                    <View style={[styles.img_Grid]}>
                      <Image
                        source={require('../images/googleLoc.png')}
                        style={{ width: '60%', height: '60%' }}
                        resizeMode='center'
                      />
                    </View>
                    <Text style={styles.Lbl_Grid}>Job by Location</Text>
                  </TouchableOpacity>

                </View>
                <View style={{ flex: 1, height: 10 }}></View>

                <View style={styles.View_Box}>

                  <TouchableOpacity style={[styles.gridItem]} onPress={() => this.goToQRCodePage()}>
                    <View style={[styles.img_Grid]}>
                      <Image
                        source={require('../images/qrCode.png')}
                        style={{ width: '60%', height: '60%' }}
                        resizeMode='center'
                      />
                    </View>
                    <Text style={styles.Lbl_Grid}>Scan QR Code</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.gridItem]} onPress={() => this.goToWebViewPage_From_UploadCV()}>
                    <View style={[styles.img_Grid]}>
                      <Image
                        source={require('../images/resume.png')}
                        style={{ width: '60%', height: '60%' }}
                        resizeMode='center'
                      />
                    </View>
                    <Text style={styles.Lbl_Grid}>Upload CV</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.gridItem]} onPress={() => this.goToJobbyCategoryPage()}>
                    <View style={[styles.img_Grid]}>
                      <Image
                        source={require('../images/jobByCat.png')}
                        style={{ width: '60%', height: '60%' }}
                        resizeMode='center'
                      />
                    </View>
                    <Text style={styles.Lbl_Grid}>Job by Category</Text>
                  </TouchableOpacity>

                </View>

                <TouchableOpacity style={{ justifyContent: 'flex-end' }} onPress={() => this.goToWebViewPage_From_ShareMyProfile()}>
                  <Text style={styles.Lbl_ShareText}>Share My Profile</Text>
                </TouchableOpacity>

              </ScrollView>
            </View>
          </View>
          <BottomViewClass />
          {this.state.isLoading ? <Loading /> : null}
        </SafeAreaView>
      </Fragment>

    );
  }
}

const mapStateToProps = (state) => {
  const { appdata } = state
  return { appdata }
};

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    // Increase Counter
    showLoader: (payload) => dispatch({
      type: 'SHOW_LOADER',
      payload: payload,
    }),
    hideLoader: (payload) => dispatch({
      type: 'HIDE_LOADER',
      payload: payload,
    }),
    classTextUpdate: (payload) => dispatch({
      type: 'USER_CLASS_UPDATE',
      payload: payload,
    }),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 0,
    marginBottom: 42,
  },
  View_1_Scroll: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "gray",
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  View_2_Scroll: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 15,
    //backgroundColor: 'red',
  },
  Lbl_Right2Text: {
    fontSize: 20,
    color: '#1c313b',
    fontWeight: '500',
    textAlign: 'left',
    //backgroundColor: 'blue',
    flex: 1,
    flexWrap: 'wrap',
    fontFamily: 'Acme-Regular',
  },
  Lbl_DB_Heading_1_Text: {
    fontSize: 22,
    color: 'white',
    textAlign: 'left',
    fontFamily: 'Acme-Regular',
    //fontFamily: 'Lobster-Regular',
  },
  Lbl_DB_Heading_2_Text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'left',
    fontFamily: 'Acme-Regular',
  },

  View_Box: {
    flex: 1,
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  gridItem: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: "#2fa1f7",
    borderWidth: 0.3,
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "#2fa1f7",
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },

  img_Grid: {
    width: 50, height: 50, justifyContent: 'center',
    alignItems: 'center', alignSelf: 'center', backgroundColor: '#2fa1f7', borderRadius: 25,
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "gray",
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  Lbl_Grid: {
    margin: 5,
    fontSize: 12,
    color: '#1c313b',
    textAlign: 'center',
    fontFamily: 'Acme-Regular',
  },

  Lbl_ShareText: {
    margin: 10,
    paddingTop: 5,
    fontSize: 18,
    color: '#2fa1f7',
    textAlign: 'center',
    //fontFamily: 'Lobster-Regular',
    fontFamily: 'Acme-Regular',
    textDecorationLine: 'underline',
  },

});