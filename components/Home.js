import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    View,
    Button,
    Text,
    Image,
    StatusBar,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native'; 

import AnimateLoadingButton from 'react-native-animate-loading-button';

import Loading from './Loading';

class Home extends React.Component {

    static navigationOptions = {
        header: null,
        title: '',
        headerStyle: {
            backgroundColor: '#2fa1f7',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            passwordText: "",
            isLoading: false,
            // userName: "contezza@gmail.com", 
            // passwordText: "123456", 
            //isLoading: false,
        }
    }

    componentDidMount() {

    }

    async getData() {

        var postData = new FormData();
        postData.append('email', this.state.userName);
        postData.append('password', this.state.passwordText);

        const response = await fetch("http://ijobs.shop/webservice/login.php", {
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

    openWebView = () => {
        //this.props.navigation.navigate('RegWebView', {})
        this.props.navigation.navigate('SignUp', {})
    }

    skipButtonPress = () => {
        this.props.updateUserImage('');
        this.props.updateUserDetilas([]);
        this.setState({ passwordText: "" })
        this.props.navigation.navigate('DashBoard', {})
    }

    checkLogin = () => {

        const { userName, passwordText } = this.state

        if (userName == '') {
            Alert.alert('Warning', 'Please enter email.')

        } else if (passwordText == '') {
            Alert.alert('Warning', 'Please enter password.')

        } else {

            //this.setState({ isLoading: true });
            this.loadingButton.showLoading(true);
            this.getData()
                .catch(() => {
                    this.loadingButton.showLoading(false);
                    Alert.alert('Warning', 'No internet connection')
                })
                .then((data) => {
                    console.log('data:- ', data);
                    //this.setState({ isLoading: false });
                    this.loadingButton.showLoading(false);

                    if (parseInt(data.success) == 1) {
                        this.props.updateUserDetilas(data.details);

                        if (data.profile_image.indexOf(".jpg") > -1 ||
                            data.profile_image.indexOf(".jpeg") > -1 ||
                            data.profile_image.indexOf(".jpe") > -1 ||
                            data.profile_image.indexOf(".png") > -1 ||
                            data.profile_image.indexOf(".bmp") > -1
                        ) {
                            this.props.updateUserImage(data.profile_image);

                        } else {
                            this.props.updateUserImage('');
                        }

                        /* SKILL UPDATE */

                        var tempArray = []
                        var len = data.allSkills.details.length;
                        for (let i = 0; i < len; i++) {
                            let row = data.allSkills.details[i];
                            tempArray.push({ id: i.toString(), clas_nam: row, isSelect: false })
                        }
                        this.props.updateUserSkillDetilas(tempArray);

                        /* EQUALIFICATION UPDATE */

                        var tempArray2 = []
                        var len = data.allQualification.details.length;
                        for (let i = 0; i < len; i++) {
                            let row = data.allQualification.details[i];
                            tempArray2.push({ id: i.toString(), clas_nam: row, isSelect: false })
                        }
                        this.props.updateUserEQualificationDetilas(tempArray2);

                        /* DONE */

                        console.log('Profile image Path: ', data.profile_image);

                        this.setState({ passwordText: "" })
                        this.props.navigation.navigate('DashBoard', {})

                    } else if (parseInt(data.success) == 0) {
                        Alert.alert('Warning', data.details)

                    } else {
                        Alert.alert('Error', 'error during processing.')
                    }
                });

        }
    }

    render() {
        //console.log("Home props ===>>>> ", JSON.stringify(this.props))
        return (
            <Fragment>
                <ImageBackground
                    source={require('../images/bgImg2.jpg')}
                    style={{ position: 'absolute', left: 0, right: 0, width: '100%', height: '100%' }}
                    resizeMode='cover'
                ></ImageBackground>
                <SafeAreaView style={{ flex: 1 }}>
                    <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }}
                        behavior={(Platform.OS === 'ios') ? "padding" : null} enabled keyboardVerticalOffset={0} >

                        <ScrollView style={{ flex: 1 }}
                            contentContainerStyle={{ flexGrow: 1 }}
                            bounces={false}>
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <View style={{ width: 160, height: 160, backgroundColor: '#ffffff', borderRadius: 80, justifyContent: 'center', alignSelf: 'center', overflow: 'hidden', }}>
                                    <Image
                                        source={require('../images/bg_Logo.png')}
                                        style={{ width: 125, height: 125, alignSelf: 'center' }}
                                        resizeMode='cover'
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <View style={styles.View_TextBox}>
                                    <TextInput
                                        style={styles.textBox}
                                        placeholder="Username"
                                        placeholderTextColor='gray'
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                        keyboardType="email-address"
                                        returnKeyType='next'
                                        onChangeText={text => this.setState({ userName: text })}
                                        value={this.state.userName}
                                        autoCorrect={false}
                                    />
                                </View>
                                <View style={styles.View_TextBox}>
                                    <TextInput
                                        style={styles.textBox}
                                        placeholder="Password"
                                        placeholderTextColor='gray'
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                        secureTextEntry={true}
                                        returnKeyType='done'
                                        onChangeText={text => this.setState({ passwordText: text })}
                                        value={this.state.passwordText}
                                        autoCorrect={false}
                                    />
                                </View>

                                <View style={{ marginTop: 10, width: 300, height: 55, justifyContent: 'center' }}>
                                    <AnimateLoadingButton
                                        ref={c => (this.loadingButton = c)}
                                        width={300}
                                        height={50}
                                        title="Login"
                                        titleFontFamily={'Acme-Regular'}
                                        titleFontSize={20}
                                        titleColor="rgb(255,255,255)"
                                        backgroundColor="#1c313b"
                                        borderRadius={25}
                                        onPress={() => this.checkLogin()}
                                    />
                                </View>
                                <View style={{ height: 20, width: '100%' }}></View>
                                <TouchableOpacity onPress={() => this.openWebView()} >
                                    <Text style={styles.LoginButtonText}>Create a new account</Text>
                                </TouchableOpacity>
                                <View style={{ height: 20, width: '100%' }}></View>
                                <TouchableOpacity onPress={() => this.skipButtonPress()} >
                                    <Text style={styles.LoginButtonText}>Skip</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                        {this.state.isLoading ? <Loading /> : null}
                    </KeyboardAvoidingView>
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
        showLoader: (payload) => dispatch({
            type: 'SHOW_LOADER',
            payload: payload,
        }),
        hideLoader: (payload) => dispatch({
            type: 'HIDE_LOADER',
            payload: payload,
        }),
        updateUserDetilas: (payload) => dispatch({
            type: 'USER_UPDATE',
            payload: payload,
        }),
        updateUserSkillDetilas: (payload) => dispatch({
            type: 'USER_SKILL_UPDATE',
            payload: payload,
        }),
        updateUserEQualificationDetilas: (payload) => dispatch({
            type: 'USER_EQUALIFICATION_UPDATE',
            payload: payload,
        }),
        updateUserImage: (payload) => dispatch({
            type: 'USER_IMAGE_UPDATE',
            payload: payload,
        }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
    body: {
        //backgroundColor: '#455a64',
        //flex: 1,
        height: 100 + '%',
        width: 100 + '%',
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'column',
    },
    View_TextBox: {
        width: 300,
        height: 55,
        //backgroundColor: 'rgba(255, 255, 255,0.3)',
        backgroundColor: 'white',
        borderRadius: 25,
        paddingHorizontal: 20,
        marginVertical: 10,
        //borderWidth: 2,
        //borderColor: '#0620c9',
        elevation: 4,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "#ff12d0",
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    textBox: {
        height: 98 + '%',
        fontSize: 20,
        color: '#455a64',
        fontFamily: 'Acme-Regular',
        //backgroundColor: 'red',
        //alignSelf: 'center',
        //flex: 1,
    },
    View_ButtonDropDown: {
        //width: 300,
        //height: 55,
        //backgroundColor: 'rgba(255, 255, 255,0.3)',
        backgroundColor: 'white',
        //borderRadius: 25,
        //paddingHorizontal: 20,
        //marginVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 4,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "#ff12d0",
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    View_ButtonText: {
        width: 300,
        height: 55,
        backgroundColor: '#1c313b',
        borderRadius: 25,
        paddingHorizontal: 20,
        marginVertical: 10,
        justifyContent: "center",
    },
    LoginButtonText: {
        fontSize: 20,
        color: 'white',
        //fontWeight: '500',
        textAlign: 'center',
        fontFamily: 'Acme-Regular',
    },
});
