/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
// import AppNavigator from './components/AppNavigator';
import { connect } from 'react-redux';

import {
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import HomeScreen from './components/Home';
import SignUpScreen from './components/SignUp';

//import DashBoardScreen from './components/DashBoard';
import DashBoard from './components/Dashboard';
import ProfileScreen from './components/Profile';
import EditProfileScreen from './components/EditProfile';
import JobByCatScreen from './components/JobByCat';
import JobListingScreen from './components/JobListing';
import CusWebViewScreen from './components/CusWebView';
import QRCodeScannerScreen from './components/QRCodeScanner';
import NotificationListScreen from './components/NotificationList';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { isIphoneX } from 'react-native-iphone-x-helper';

const Stack = createStackNavigator();

class App extends React.Component {

  componentDidMount() {

    this.props.showLoader();
    setTimeout(function () {
      this.props.hideLoader();
    }.bind(this), 2000);
  }

  _logOutClick = (navigation) => {

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
            onPress: () => navigation.navigate('Home',{})
          },
        ],
        { cancelable: false },
      );
    } else {
      // this.props.navigation.navigate('Home', {})
      navigation.navigate('Home',{});
    }

  }

  _bellNotificationClick = (navigation) => {
    if (this.checkUserLogin()) {
      navigation.navigate('NotificationList',{});
    } else {
      navigation.navigate('Home',{});
    }
  }

  checkUserLogin = () => {
    if (this.props.appdata.userDetails.length == 0) {
      return false
    } else {
      return true
    }
  }

  render() {
    //console.log("Apps props ===>>>> ", JSON.stringify(this.props))
    return (
      <Fragment>
        <StatusBar
          translucent
          backgroundColor="#2fa1f7"
          barStyle="light-content"
        />
        <View
          style={{
            backgroundColor: '#2fa1f7',
            height: Platform.OS === 'ios' ? isIphoneX()? 50 : 20 : StatusBar.currentHeight,
          }}>

        </View>
        {this.props.appdata.isLoadState ?
          <View style={{
            flex: 1,
            backgroundColor: '#2fa1f7',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <View style={{ width: 250, height: 250, backgroundColor: '#ffffff', borderRadius: 125, overflow: 'hidden', }}>
              <Image
                source={require('./images/bg_Logo.png')}
                style={{ width: 220, height: 220, alignSelf: 'center' }}
                resizeMode='cover'
              />
            </View>
          </View> :

          <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home"  component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp"  component={SignUpScreen}
            options={{
                headerTitle: 'Register',
                headerStyle: {
                  backgroundColor: '#2fa1f7',
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                },
                headerBackTitleVisible: false,
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
                // headerRight: (<View></View>),
            }}
             />
             <Stack.Screen name="DashBoard"  component={DashBoard}
             options={({ navigation, route }) => ({
              headerTitle: 'DashBoard',
                  headerStyle: {

                    backgroundColor: '#2fa1f7',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                  },
                  headerBackTitleVisible: false,
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

                  headerRight: () => (
                    <TouchableOpacity style={{ justifyContent: 'center', }} onPress={() => this._logOutClick(navigation)}>
                      <Image
                        source={require('./images/logout.png')}
                        style={{ width: 40, height: 40, marginRight: 10, alignSelf: 'center', }}
                        resizeMode='center'
                      />
                    </TouchableOpacity>
                  ),
                  headerLeft: () => (
                    <TouchableOpacity style={{ justifyContent: 'center', }} onPress={() => this._bellNotificationClick(navigation)}>
                      <Image
                        source={require('./images/bell.png')}
                        style={{ width: 40, height: 40, marginLeft: 10, alignSelf: 'center', }}
                        resizeMode='center'
                      />
                    </TouchableOpacity>
                  ),
            })}

             />
             <Stack.Screen name="Profile"  component={ProfileScreen}
              options={{
                  headerTitle: 'My Profile',
                  headerStyle: {

                    backgroundColor: '#2fa1f7',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                  },
                  headerBackTitleVisible: false,
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
                  // headerRight: (<View></View>),
              }}
             />
             <Stack.Screen name="EditProfile"  component={EditProfileScreen}
              options={{
                  headerTitle: 'Edit Profile',
                  headerStyle: {

                    backgroundColor: '#2fa1f7',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                  },
                  headerBackTitleVisible: false,
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
                  // headerRight: (<View></View>),
              }}
             />
             <Stack.Screen name="JobByCat"  component={JobByCatScreen}
              options={{
                  headerTitle: 'Job by Category',
                  headerStyle: {

                    backgroundColor: '#2fa1f7',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                  },
                  headerBackTitleVisible: false,
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
                  // headerRight: (<View></View>),
              }}
             />
             <Stack.Screen name="JobListing"  component={JobListingScreen}
              options={{
                  headerTitle: 'Job Listing',
                  headerStyle: {

                    backgroundColor: '#2fa1f7',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                  },
                  headerBackTitleVisible: false,
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
                  // headerRight: (<View></View>),
              }}
             />
             <Stack.Screen name="CusWebView"  component={CusWebViewScreen}
              options={{
                  headerTitle: 'Job Listing',
                  headerStyle: {

                    backgroundColor: '#2fa1f7',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                  },
                  headerBackTitleVisible: false,
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
                  // headerRight: (<View></View>),
              }}
             />
             <Stack.Screen name="QRCodeScanner"  component={QRCodeScannerScreen}
              options={{
                  headerTitle: 'Scan QR Code',
                  headerStyle: {

                    backgroundColor: '#2fa1f7',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                  },
                  headerBackTitleVisible: false,
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
                  // headerRight: (<View></View>),
              }}
             />
             <Stack.Screen name="NotificationList"  component={NotificationListScreen}
              options={{
                  headerTitle: 'Applied Jobs',
                  headerStyle: {

                    backgroundColor: '#2fa1f7',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                  },
                  headerBackTitleVisible: false,
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
                  // headerRight: (<View></View>),
              }}
             />
          </Stack.Navigator>
          </NavigationContainer>
        }

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
    showLoader: (payload) => dispatch({
      type: 'SHOW_LOADER',
      payload: payload,
    }),
    hideLoader: (payload) => dispatch({
      type: 'HIDE_LOADER',
      payload: payload,
    }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
