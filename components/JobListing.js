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

import Loading from './Loading';
import BottomViewClass from './BottomView';

class Profile extends React.Component {

    state = {
        isLoading: false,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({ isLoading: false });
        this.props.navigation.setParams({ handleClosePage: this._closeFromPage });
    }

    _closeFromPage = () => {
        this.props.navigation.navigate('DashBoard', {})
    }

    tapped_Accept = (data) => {
        if (this.props.appdata.userDetails.length == 0) {
            this.props.navigation.navigate('Home', {})
        } else {
            this.setState({ isLoading: true });
            this.webServiceForApplyJob(data.jobpost_id)
        }
    }

    webServiceForApplyJob = (jobPostID) => {

        this.updateApplyJob(jobPostID)
            .catch(() => {
                this.setState({ isLoading: false });
                setTimeout(function () {
                    Alert.alert('Warning', 'No internet connection')
                }.bind(this), 1)
            })
            .then((data) => {
                this.setState({ isLoading: false });
                console.log('data 1:- ', data.success);
                if (parseInt(data.success) == 1) {
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

    async updateApplyJob(jobPostID) {

        var postData = new FormData();
        postData.append('job_seeker_id', this.props.appdata.userDetails[0].job_seeker_id);
        postData.append('jobpost_id', jobPostID);
        postData.append('added_date', this.props.route.params.jobListArray[0].added_date);

        console.log('postData ::: ', postData);

        const response = await fetch("http://ijobs.shop/webservice/apply_job.php", {
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
            title: 'Job Listing',
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
            headerLeft: (<View></View>),
            headerRight: (<TouchableOpacity style={{ justifyContent: 'center', }} onPress={() => params.handleClosePage()}>
                <Image
                    source={require('../images/bigcross.png')}
                    style={{ width: 40, height: 40, marginRight: 10, alignSelf: 'center', }}
                    resizeMode='center'
                />
            </TouchableOpacity>),
        };
    };

    render() {
        const { navigate } = this.props.navigation;
        //console.log("Job Listing props ===>>>> ", JSON.stringify(this.props))
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

                        <FlatList
                            style={{ flex: 1 }}
                            data={this.props.route.params.jobListArray}
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
                                        <Text style={styles.Lbl_Grid}>Job Type: </Text>
                                        <Text style={styles.Lbl_ShareText}>{item.job_type}</Text>
                                    </View>
                                    <View style={{ height: 1, width: '94%', backgroundColor: '#2fa1f7' }}></View>
                                    <View style={[styles.gridItem]}>
                                        <Text style={styles.Lbl_Grid}>Salary Range: </Text>
                                        <Text style={styles.Lbl_ShareText}>{item.min_salary} - {item.max_salary}</Text>
                                    </View>
                                    <View style={{ height: 1, width: '94%', backgroundColor: '#2fa1f7' }}></View>
                                    <View style={{
                                        height: 60,
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                    }}>
                                        <TouchableOpacity style={[styles.smallBtn_Design, styles.smallBtn_Green]} onPress={() => this.tapped_Accept(item)}>
                                            <Text style={[styles.LoginButtonText, styles.LoginBtnColor_White]}>Apply For This Job</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                        />
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

    LoginButtonText: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Acme-Regular',
    },
    LoginBtnColor_White: {
        color: 'white',
    },

    smallBtn_Design: {
        flex: 1,
        height: 40,
        maxWidth: 180,
        borderRadius: 25,
        margin: 10,
        justifyContent: "center",
    },
    smallBtn_Green: {
        backgroundColor: 'green',
    },

});