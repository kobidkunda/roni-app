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
    FlatList,
    Alert,
} from 'react-native';

import BottomViewClass from './BottomView';
import Loading from './Loading';

class Notification extends React.Component {

    state = {
        notiType: true,
        detailsArray: [],
        isLoading: false,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        this.setState({
            notiType: true
        });
        this.setState({ isLoading: true });
        this.webServiceForClass()
    }

    async getListNotificationInterview() {

        var postData = new FormData();
        postData.append('job_seeker_id', this.props.appdata.userDetails[0].job_seeker_id);
        postData.append('notifi', this.state.notiType == true ? 'notification' : 'interview');

        console.log('postData ::: ', this.state.notiType);

        const response = await fetch("http://ijobs.shop/webservice/notification-01.php", {
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

    webServiceForClass = () => {

        this.getListNotificationInterview()
            .catch(() => {
                this.setState({ isLoading: false });
                setTimeout(function () {
                    Alert.alert('Warning', 'No internet connection')
                }.bind(this), 1)
            })
            .then((data) => {

                if (this.state.notiType) {
                    this.setState({ isLoading: false });
                    console.log('data 1:- ', data.allSkills.success);
                    if (parseInt(data.allSkills.success) == 1) {
                        this.setState({ detailsArray: data.allSkills.details })
                    } else {
                        setTimeout(function () {
                            Alert.alert('Error', 'error during processing.')
                        }.bind(this), 1)
                    }
                } else {
                    this.setState({ isLoading: false });
                    console.log('data 2:- ', data.success);
                    if (parseInt(data.success) == 1) {
                        this.setState({ detailsArray: data.details })
                    } else {
                        setTimeout(function () {
                            Alert.alert('Error', 'error during processing.')
                        }.bind(this), 1)
                    }
                }


            });
    }

    tapped_Notification = () => {

        this.setState({
            notiType: true
        });

        setTimeout(() => {
            this.setState({ isLoading: true });
            this.webServiceForClass()
        }, 1);
    }
    tapped_Interview = () => {

        this.setState({
            notiType: false
        });

        setTimeout(() => {
            this.setState({ isLoading: true });
            this.webServiceForClass()
        }, 1);
    }

    async updateInterviewStatus(jobPostID, statusText) {

        var postData = new FormData();
        postData.append('seeker_id', this.props.appdata.userDetails[0].job_seeker_id);
        postData.append('jobpost_id', jobPostID);
        postData.append('status', statusText);

        console.log('postData ::: ', postData);

        const response = await fetch("http://ijobs.shop/webservice/job_apply_status.php", {
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

    webServiceForInterviewStatus = (jobPostID, statusText) => {

        this.updateInterviewStatus(jobPostID, statusText)
            .catch(() => {
                this.setState({ isLoading: false });
                setTimeout(function () {
                    Alert.alert('Warning', 'No internet connection')
                }.bind(this), 1)
            })
            .then((data) => {
                this.setState({ isLoading: false });
                console.log('data 1:- ', data.success);
                if (parseInt(data.success) == 0) {
                    setTimeout(function () {
                        Alert.alert('Success', data.details)
                    }.bind(this), 1)
                } else {
                    setTimeout(function () {
                        Alert.alert('Error', 'error during processing.')
                    }.bind(this), 1)
                }
            });
    }

    tapped_Accept = (data) => {
        this.setState({ isLoading: true });
        this.webServiceForInterviewStatus(data.jobpost_id, 'accept')
    }
    tapped_Reject = (data) => {
        this.setState({ isLoading: true });
        this.webServiceForInterviewStatus(data.jobpost_id, 'reject')
    }

    static navigationOptions = ({ navigation }) => ({

        title: 'Applied Jobs',
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
                        <View style={{
                            height: 80,
                            backgroundColor: '#2fa1f7',
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}>
                            <TouchableOpacity style={topTabButton_Design(this.state.notiType)} onPress={() => this.tapped_Notification()}>
                                <Text style={[styles.LoginButtonText, styles.LoginBtnColor_Blue]}>Notification</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={topTabButton_Design(!this.state.notiType)} onPress={() => this.tapped_Interview()}>
                                <Text style={[styles.LoginButtonText, styles.LoginBtnColor_Blue]}>Interview</Text>
                            </TouchableOpacity>
                        </View>
                        <ImageBackground style={{
                            height: 40, //backgroundColor: '#2fa1f7',
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                            source={require('../images/waveImg.png')}
                            resizeMode='stretch'
                        ></ImageBackground>

                        <FlatList
                            data={this.state.detailsArray}
                            renderItem={({ item }) =>
                                <View style={styles.View_Box}>
                                    <View style={[styles.gridItem]}>
                                        <Text style={styles.Lbl_Grid}>Job Title: </Text>
                                        <Text style={styles.Lbl_ShareText}>{item.job_title}</Text>
                                    </View>
                                    <View style={{ height: 1, width: '94%', backgroundColor: '#2fa1f7' }}></View>
                                    <View style={[styles.gridItem]}>
                                        <Text style={styles.Lbl_Grid}>Company Name: </Text>
                                        <Text style={styles.Lbl_ShareText}>{item.company_name}</Text>
                                    </View>
                                    <View style={{ height: 1, width: '94%', backgroundColor: '#2fa1f7' }}></View>
                                    <View style={[styles.gridItem]}>
                                        <Text style={styles.Lbl_Grid}>Location: </Text>
                                        <Text style={styles.Lbl_ShareText}>{item.location}</Text>
                                    </View>
                                    <View style={{ height: 1, width: '94%', backgroundColor: '#2fa1f7' }}></View>
                                    <View style={[styles.gridItem]}>
                                        <Text style={styles.Lbl_Grid}>Employer Status: </Text>
                                        <Text style={styles.Lbl_ShareText}>{item.employer_status == '' ? 'None' : item.employer_status}</Text>
                                    </View>
                                    {!this.state.notiType ? <View style={{ height: 1, width: '94%', backgroundColor: '#2fa1f7' }}></View> : null}
                                    {!this.state.notiType ? <View style={[styles.gridItem]}>
                                        <Text style={styles.Lbl_Grid}>Interview Date: </Text>
                                        <Text style={styles.Lbl_ShareText}>{item.interview_date == '' ? 'None' : item.interview_date}</Text>
                                    </View> : null}
                                    {!this.state.notiType ? <View style={{ height: 1, width: '94%', backgroundColor: '#2fa1f7' }}></View> : null}
                                    {!this.state.notiType ? <View style={[styles.gridItem]}>
                                        <Text style={styles.Lbl_Grid}>Interview Time: </Text>
                                        <Text style={styles.Lbl_ShareText}>{item.interview_time == '' ? 'None' : item.interview_time}</Text>
                                    </View> : null}
                                    {!this.state.notiType ? <View style={{ height: 1, width: '94%', backgroundColor: '#2fa1f7' }}></View> : null}
                                    {!this.state.notiType ? <View style={{
                                        height: 60,
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                    }}>
                                        <TouchableOpacity style={[styles.smallBtn_Design, styles.smallBtn_Green]} onPress={() => this.tapped_Accept(item)}>
                                            <Text style={[styles.LoginButtonText, styles.LoginBtnColor_White]}>Accept</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.smallBtn_Design, styles.smallBtn_Red]} onPress={() => this.tapped_Reject(item)}>
                                            <Text style={[styles.LoginButtonText, styles.LoginBtnColor_White]}>Reject</Text>
                                        </TouchableOpacity>
                                    </View> : null}
                                </View>
                            }
                        />
                    </View>
                    <BottomViewClass />
                </SafeAreaView>
                {this.state.isLoading ? <Loading /> : null}
            </Fragment >


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

export default connect(mapStateToProps, mapDispatchToProps)(Notification);

topTabButton_Design = function (options) {
    if (options) {
        return {
            flex: 1,
            height: 40,
            maxWidth: 120,
            borderRadius: 25,
            margin: 10,
            justifyContent: "center",
            backgroundColor: 'white',
        }
    } else {
        return {
            flex: 1,
            height: 40,
            maxWidth: 120,
            borderRadius: 25,
            margin: 10,
            justifyContent: "center",
            backgroundColor: '#2fa1f7',
        }
    }

}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        alignItems: 'center',
        alignItems: 'stretch',
        marginTop: 0,
        marginBottom: 42,
    },

    gridItem: {
        flex: 1,
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
    },

    LoginButtonText: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Acme-Regular',
    },

    LoginBtnColor_Blue: {
        color: '#1c313b',
    },
    LoginBtnColor_White: {
        color: 'white',
    },

    smallBtn_Design: {
        flex: 1,
        height: 40,
        maxWidth: 120,
        borderRadius: 25,
        margin: 10,
        justifyContent: "center",
    },
    smallBtn_Red: {
        backgroundColor: 'red',
    },
    smallBtn_Green: {
        backgroundColor: 'green',
    },

});