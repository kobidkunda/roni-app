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

import { WebView } from 'react-native-webview';
import BottomViewClass from './BottomView';
import Loading from './Loading';

class CustWebView extends React.Component {

  state = {
    isLoading: false,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
  }

  onLoadSpinner = () => {
    this.setState({ isLoading: true });
    console.log("onLoadSpinner ===>>>> ")

  }
  onLoadStartSpinner = () => {
    console.log("onLoadStartSpinner ===>>>> ")
  }
  onLoadEndSpinner = () => {
    this.setState({ isLoading: false });
    console.log("onLoadEndSpinner ===>>>> ")

  }

  goToProfilePage = () => {
    this.props.navigation.navigate('Profile', {})
  }

  static navigationOptions = ({ navigation }) => ({

    title: navigation.getParam('pageName'),
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
    console.log("CustWebView props ===>>>> ", this.props.route.params.pageUrl);
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f4f7' }}>
        <View style={styles.MainContainer} >
          <ImageBackground style={{
            height: 40, //backgroundColor: '#2fa1f7',
            alignItems: 'center',
            flexDirection: 'row',
          }}
            source={require('../images/waveImg.png')}
            resizeMode='stretch'
          ></ImageBackground>
          <WebView
            source={{ uri: this.props.route.params.pageUrl }}
            style={{ flex: 1 }}
            onLoad={() => this.onLoadSpinner()}
            onLoadStart={() => this.onLoadStartSpinner()}
            onLoadEnd={() => this.onLoadEndSpinner()}
            bounces={false}
            backgroundColor={'#f2f4f7'}
          />
           
        </View>
        <BottomViewClass />
        {this.state.isLoading ? <Loading /> : null}
      </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(CustWebView);

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