import React, { Fragment, Component } from 'react';
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
} from 'react-native';

import BottomViewClass from './BottomView';

class Profile extends React.Component {

  state = {
    arrayTopicList: []
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  goToProfilePage = () => {
    this.props.navigation.navigate('Profile', {})
  }


  static navigationOptions = ({ navigation }) => ({

    title: 'My Profile',
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
    const { navigate } = this.props.navigation;
    console.log("Profiles props ===>>>> ", JSON.stringify(this.props))
    return (
      <Fragment>
        <ImageBackground
          //source={require('../images/blueGradient.png')}
          style={{ position: 'absolute', left: 0, right: 0, width: '100%', height: '100%', backgroundColor: '#f2f4f7' }}
          resizeMode='cover'
        ></ImageBackground>
        <SafeAreaView style={{ flex: 1 }}>

          <View style={styles.MainContainer} >

            <ImageBackground style={{
              height: 40, //backgroundColor: '#2fa1f7',
              alignItems: 'center',
              flexDirection: 'row',
            }}
              source={require('../images/waveImg.png')}
              resizeMode='stretch'
            ></ImageBackground>


            <View style={{
              height: 100, //backgroundColor: '#2fa1f7',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
              <View style={{
                backgroundColor: '#f7990c',
                width: 90,
                borderRadius: 45,
                marginLeft: 30,
                elevation: 4,
                shadowOffset: { width: 5, height: 5 },
                shadowColor: "gray",
                shadowOpacity: 0.5,
                shadowRadius: 10,
                borderColor: 'white',
                borderWidth: 5,
                overflow: 'hidden',
              }} >
                <Image
                  source={this.props.appdata.userImage_Profile.uri == "" ?
                    require('../images/userProfile.png') :
                    this.props.appdata.userImage_Profile}
                  style={{ width: 80, height: 80, alignSelf: 'center' }}
                  resizeMode='center'
                />
              </View>
              <View style={{
                flex: 1,
                marginLeft: 20,
                marginRight: 20,
              }} >
                <Text style={styles.Lbl_DB_Heading_1_Text}>{this.props.appdata.userDetails[0].job_seeker_name}</Text>
                <Text style={styles.Lbl_DB_Heading_2_Text}>User Id: {this.props.appdata.userDetails[0].job_seeker_id}</Text>
              </View>
            </View>
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
                  <View style={[styles.gridItem]}>
                    <Text style={styles.Lbl_Grid}>Name: </Text>
                    <Text style={styles.Lbl_ShareText}>{this.props.appdata.userDetails[0].job_seeker_name}</Text>
                  </View>
                  <View style={{ height: 1, width: '100%', backgroundColor: '#2fa1f7' }}></View>
                  <View style={[styles.gridItem]}>
                    <Text style={styles.Lbl_Grid}>Email: </Text>
                    <Text style={styles.Lbl_ShareText}>{this.props.appdata.userDetails[0].job_seeker_email_id}</Text>
                  </View>
                  <View style={{ height: 1, width: '100%', backgroundColor: '#2fa1f7' }}></View>
                  <View style={[styles.gridItem]}>
                    <Text style={styles.Lbl_Grid}>Gender: </Text>
                    <Text style={styles.Lbl_ShareText}>{this.props.appdata.userDetails[0].job_seeker_gender}</Text>
                  </View>
                  <View style={{ height: 1, width: '100%', backgroundColor: '#2fa1f7' }}></View>
                  <View style={[styles.gridItem]}>
                    <Text style={styles.Lbl_Grid}>Mobile No.: </Text>
                    <Text style={styles.Lbl_ShareText}>{this.props.appdata.userDetails[0].job_seeker_mobile_code}{this.props.appdata.userDetails[0].job_seeker_mobile_number}</Text>
                  </View>
                  <View style={{ height: 1, width: '100%', backgroundColor: '#2fa1f7' }}></View>
                  <View style={[styles.gridItem]}>
                    <Text style={styles.Lbl_Grid}>Age: </Text>
                    <Text style={styles.Lbl_ShareText}>{this.props.appdata.userDetails[0].job_seeker_age} years</Text>
                  </View>
                </View>

                <View style={{ flex: 1, height: 10 }}></View>

                <View style={styles.View_Box}>
                  <View style={[styles.gridItem]}>
                    <Text style={styles.Lbl_Grid}>Job Type: </Text>
                    <Text style={styles.Lbl_ShareText}>{this.props.appdata.userDetails[0].job_seeker_job_type}</Text>
                  </View>
                  <View style={{ height: 1, width: '100%', backgroundColor: '#2fa1f7' }}></View>
                  <View style={[styles.gridItem]}>
                    <Text style={styles.Lbl_Grid}>Job Type Time: </Text>
                    <Text style={styles.Lbl_ShareText}>{this.props.appdata.userDetails[0].job_seeker_job_type_time}</Text>
                  </View>
                </View>

                <View style={{ flex: 1, height: 10 }}></View>

                <View style={styles.View_Box}>
                  <View style={[styles.gridItem]}>
                    <Text style={styles.Lbl_Grid}>Industry Type: </Text>
                    <Text style={styles.Lbl_ShareText}>{this.props.appdata.userDetails[0].job_seeker_industry_type}</Text>
                  </View>
                  <View style={{ height: 1, width: '100%', backgroundColor: '#2fa1f7' }}></View>
                  <View style={[styles.gridItem]}>
                    <Text style={styles.Lbl_Grid}>Skill: </Text>
                    <Text style={styles.Lbl_ShareText}>{this.props.appdata.userDetails[0].job_seeker_skill}</Text>
                  </View>
                  <View style={{ height: 1, width: '100%', backgroundColor: '#2fa1f7' }}></View>
                  <View style={[styles.gridItem]}>
                    <Text style={styles.Lbl_Grid}>Educational Qualification: </Text>
                    <Text style={styles.Lbl_ShareText}>{this.props.appdata.userDetails[0].job_seeker_educational_qualification}</Text>
                  </View>
                </View>

              </ScrollView>
            </View>
          </View>
          <BottomViewClass />
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 0,
    marginBottom: 42,
  },

  Lbl_DB_Heading_1_Text: {
    fontSize: 22,
    color: '#1c313b',
    textAlign: 'left',
    fontFamily: 'Acme-Regular',
    //fontFamily: 'Lobster-Regular',
  },
  Lbl_DB_Heading_2_Text: {
    fontSize: 16,
    color: '#1c313b',
    textAlign: 'left',
    fontFamily: 'Acme-Regular',
  },

  gridItem: {
    flex: 1,
    //height: 120,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'center',

  },

  View_Box: {
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
  Lbl_Grid: {
    margin: 5,
    fontSize: 14,
    color: '#147ffa',
    textAlign: 'left',
    fontFamily: 'Acme-Regular',
    //backgroundColor: 'red',
    alignSelf: 'center',
    maxWidth: 120,
  },

  Lbl_ShareText: {
    flex: 1,
    margin: 5,
    fontSize: 18,
    color: '#1c313b',
    textAlign: 'left',
    fontFamily: 'Acme-Regular',
    //backgroundColor: 'red',
  },

});