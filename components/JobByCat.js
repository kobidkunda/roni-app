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
    Alert,
} from 'react-native';

import DropDown from './DropDown';
import BottomViewClass from './BottomView';
import Loading from './Loading';
import SQLite from "react-native-sqlite-storage";
import AnimateLoadingButton from 'react-native-animate-loading-button';

class JobByCat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isPopUpOpen: false,
            isMultiSelectPopUpOpen: false,
            isFoodsMultiSelectPopUpOpen: false,
            Arg_industryType: "",
            Arg_jobType: "",
            Arg_FoodsServed: "",
            isLoading: false,
            RestaurantCategory_Array: [],
            TradesAssistance_Array: [],
            RetailShops_Array: [],
            FoodsServed_Array: [],
        };
    }

    componentDidMount() {
        this.setState({
            isPopUpOpen: false,
            isMultiSelectPopUpOpen: false,
            isFoodsMultiSelectPopUpOpen: false,
            Arg_jobType: "",
            Arg_FoodsServed: "",
            Arg_industryType: "",
            isLoading: false,
            RestaurantCategory_Array: [],
            TradesAssistance_Array: [],
            RetailShops_Array: [],
            FoodsServed_Array: [],
        });

        SQLite.DEBUG(true);
        SQLite.enablePromise(true);

        SQLite.openDatabase({
            name: 'ijobsDB.sqlite',
            createFromLocation: "~www/ijobsDB.sqlite",
            //location: 'Library',//'default',
        }).then((db) => {
            console.log("Database open!");
            //Alert.alert('Database open!')
            db.transaction((tx) => {

                tx.executeSql('SELECT * FROM RestaurantCategory', [], (tx, results) => {

                    var tempArray = []
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        //console.log(`Employee name: ${row.rc_Name}`);
                        tempArray.push({ id: i.toString(), clas_nam: row.rc_Name, isSelect: false })
                    }

                    //console.log('tempArray ===>>>', JSON.stringify(tempArray));
                    this.setState({
                        RestaurantCategory_Array: tempArray,
                    });
                });

                tx.executeSql('SELECT * FROM retailShopsTbl', [], (tx, results) => {

                    var tempArray = []
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        tempArray.push({ id: i.toString(), clas_nam: row.rShopsName, isSelect: false })
                    }
                    this.setState({
                        RetailShops_Array: tempArray,
                    });
                });

                tx.executeSql('SELECT * FROM tradesAssistanceTbl', [], (tx, results) => {

                    var tempArray = []
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        tempArray.push({ id: i.toString(), clas_nam: row.tAssisName, isSelect: false })
                    }

                    //console.log('tempArray ===>>>', JSON.stringify(tempArray));
                    this.setState({
                        TradesAssistance_Array: tempArray,
                    });
                });

                tx.executeSql('SELECT * FROM foodsServedTbl', [], (tx, results) => {

                    var tempArray = []
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        //console.log(`Employee name: ${row.rc_Name}`);
                        tempArray.push({ id: i.toString(), clas_nam: row.fServedName, isSelect: false })
                    }

                    //console.log('tempArray ===>>>', JSON.stringify(tempArray));
                    this.setState({
                        FoodsServed_Array: tempArray,
                    });
                });

            });
        });
    }

    updateTruePopUpState = () => {
        this.setState({ isPopUpOpen: true });
    }

    updatePopUpState = newData => {
        console.log("newData ===>>", JSON.stringify(newData))
        if (newData.roleText != "") {
            this.setState({ Arg_industryType: newData.roleText, Arg_jobType: "", Arg_FoodsServed: "", });
            //this.props.navigation.state.params.Text_classText = newData.roleText
        }

        this.setState({ isPopUpOpen: false });
    }

    updateTrue_MultiSelect_PopUpState = () => {
        this.setState({ isMultiSelectPopUpOpen: true });
    }

    update_MultiSelect_PopUpState = newData => {
        console.log("newData ===>>", JSON.stringify(newData))
        if (newData.roleText != "") {
            this.setState({ Arg_jobType: newData.roleText });
            //this.props.navigation.state.params.Text_classText = newData.roleText
        }

        this.setState({ isMultiSelectPopUpOpen: false });
    }

    updateTrue_Foods_MultiSelect_PopUpState = () => {
        this.setState({ isFoodsMultiSelectPopUpOpen: true });
    }

    update_Foods_MultiSelect_PopUpState = newData => {
        console.log("newData ===>>", JSON.stringify(newData))
        if (newData.roleText != "") {
            this.setState({ Arg_FoodsServed: newData.roleText });
            //this.props.navigation.state.params.Text_classText = newData.roleText
        }

        this.setState({ isFoodsMultiSelectPopUpOpen: false });
    }




    async getSearchData() {

        var postData = new FormData();
        postData.append('job_seeker_id', this.props.appdata.userDetails.length == 0 ? "" : this.props.appdata.userDetails[0].job_seeker_id);
        postData.append('industry_type', this.state.Arg_industryType.trim() == "Trades & Assistance" ? "Trades Assistance" : this.state.Arg_industryType.trim());
        postData.append('industry_cat', this.state.Arg_jobType.trim());
        postData.append('food_type', this.state.Arg_FoodsServed.trim());

        console.log('postData :- ', JSON.stringify(postData));

        const response = await fetch("http://ijobs.shop/webservice/search_type.php", {
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

    searchByJobs = () => {

        if (this.state.Arg_industryType.trim() == "") {
            Alert.alert('Warning', 'Please select Industry Type.')
        } else if (this.state.Arg_jobType.trim() == "") {
            Alert.alert('Warning', 'Please select Job Type.')
        } else if (this.state.Arg_industryType.trim() == "Restaurant" && this.state.Arg_FoodsServed.trim() == "") {
            Alert.alert('Warning', 'Please select an Option Type of Foods Served.')
        } else {

            //this.setState({ isLoading: true });
            this.loadingButton.showLoading(true);
            this.getSearchData()
                .catch(() => {
                    this.loadingButton.showLoading(false);
                    Alert.alert('Warning', 'No internet connection')
                })
                .then((data) => {
                    console.log('data:- ', data);
                    //this.setState({ isLoading: false });
                    this.loadingButton.showLoading(false);

                    if (parseInt(data.success) == 1) {
                        this.props.navigation.navigate('JobListing', { jobListArray: data.details })
                    } else if (parseInt(data.success) == 0) {
                        Alert.alert('Warning', data.details)
                    } else {
                        Alert.alert('Error', 'error during processing.')
                    }
                });
        }
    }


    static navigationOptions = ({ navigation }) => ({

        title: 'Job by Category',
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
        //console.log("Job By Cat props ===>>>> ", JSON.stringify(this.state))
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
                            flex: 1,
                            margin: 10,
                            //backgroundColor: 'red',
                            alignItems: 'flex-start',
                            flexDirection: 'row',
                        }} >
                            <ScrollView style={{ flex: 1 }}
                                bounces={false}>

                                <View style={styles.View_Box}>


                                    <TouchableOpacity style={[styles.gridItem]} onPress={() => this.updateTruePopUpState()}>
                                        <Text style={styles.Lbl_Grid}>Industry Type: </Text>
                                        <View style={{ flex: 1, flexDirection: 'row', margin: 10, borderColor: '#2fa1f7', borderWidth: 1, backgroundColor: '#e3f4ff' }}>
                                            <Text style={this.state.Arg_industryType.trim() != "" ? [styles.Lbl_ShareText] : [styles.Lbl_ShareText, styles.Lbl_PlaceHolder_Color]}>
                                                {this.state.Arg_industryType.trim() != "" ? this.state.Arg_industryType : 'Select Industry Type'}
                                            </Text>
                                            <Image
                                                source={require('../images/dropDImg.png')}
                                                style={{ width: 25, height: 25, margin: 5, alignSelf: 'center' }}
                                                resizeMode='stretch'
                                            />
                                        </View>
                                    </TouchableOpacity>

                                    {this.state.Arg_industryType.trim() != "" ? <View style={[styles.gridItem]}>
                                        <Text style={styles.Lbl_Grid}>Job Type {this.state.Arg_industryType}: </Text>
                                        <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'center', width: 120, height: 35, margin: 5, borderRadius: 20, borderColor: '#2fa1f7', borderWidth: 1, backgroundColor: '#e3f4ff' }} onPress={() => this.updateTrue_MultiSelect_PopUpState()}>
                                                <Text style={[styles.Lbl_ShareText, styles.Lbl_Align_Center]}>Add/Edit</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View> : null}

                                    {this.state.Arg_jobType.trim() != "" ? <View style={[styles.gridItem]}>
                                        <Text style={styles.Lbl_Grid}>Selected Category: </Text>
                                        <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', }}>
                                            <Text style={[styles.Lbl2_ShareText]}>{this.state.Arg_jobType}</Text>
                                        </View>
                                    </View> : null}

                                    {this.state.Arg_industryType == "Restaurant" ? <View style={[styles.gridItem]}>
                                        <Text style={styles.Lbl_Grid}>Select an Option Type of Foods Served : </Text>
                                        <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'center', width: 120, height: 35, margin: 5, borderRadius: 20, borderColor: '#2fa1f7', borderWidth: 1, backgroundColor: '#e3f4ff' }} onPress={() => this.updateTrue_Foods_MultiSelect_PopUpState()}>
                                                <Text style={[styles.Lbl_ShareText, styles.Lbl_Align_Center]}>Add/Edit</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View> : null}

                                    {this.state.Arg_FoodsServed.trim() != "" ? <View style={[styles.gridItem]}>
                                        <Text style={styles.Lbl_Grid}>Selected Category: </Text>
                                        <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', }}>
                                            <Text style={[styles.Lbl2_ShareText]}>{this.state.Arg_FoodsServed}</Text>
                                        </View>
                                    </View> : null}

                                </View>

                                <View style={{ marginTop: 10, width: 300, height: 55, justifyContent: 'center', alignSelf: 'center' }}>
                                    <AnimateLoadingButton
                                        ref={c => (this.loadingButton = c)}
                                        width={300}
                                        height={50}
                                        title="Search"
                                        titleFontFamily={'Acme-Regular'}
                                        titleFontSize={20}
                                        titleColor="rgb(255,255,255)"
                                        backgroundColor="#1c313b"
                                        borderRadius={25}
                                        onPress={() => this.searchByJobs()}
                                    />
                                </View>

                            </ScrollView>
                        </View>
                    </View>
                    <BottomViewClass />
                    {this.state.isPopUpOpen ?
                        <DropDown
                            updateParent={this.updatePopUpState.bind(this)}
                            newvalue={{
                                multiSelect: false,
                                key: this.state.Arg_industryType,
                                arrayOfData: this.props.appdata.IndustryType_Array,
                            }}
                        />
                        : null}
                    {this.state.isMultiSelectPopUpOpen ?
                        <DropDown
                            updateParent={this.update_MultiSelect_PopUpState.bind(this)}
                            newvalue={{
                                multiSelect: true,
                                key: '',
                                //arrayOfData: this.props.appdata.RestaurantCategory,
                                arrayOfData: this.state.Arg_industryType.trim() == "Restaurant" ?
                                    this.state.RestaurantCategory_Array :
                                    this.state.Arg_industryType.trim() == "Trades & Assistance" ?
                                        this.state.TradesAssistance_Array :
                                        this.state.RetailShops_Array,
                            }}
                        />
                        : null}
                    {this.state.isFoodsMultiSelectPopUpOpen ?
                        <DropDown
                            updateParent={this.update_Foods_MultiSelect_PopUpState.bind(this)}
                            newvalue={{
                                multiSelect: true,
                                key: '',
                                arrayOfData: this.props.appdata.FoodsServedCategory,
                            }}
                        />
                        : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(JobByCat);

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

    Lbl2_ShareText: {
        flex: 1,
        margin: 5,
        fontSize: 14,
        color: '#1c313b',
        textAlign: 'left',
        fontFamily: 'Acme-Regular',
        //backgroundColor: 'red',
    },

    Lbl_Align_Center: {
        textAlign: 'center',
    },

    View_ButtonText: {
        alignSelf: 'center',
        width: 300,
        height: 55,
        backgroundColor: '#1c313b',
        borderRadius: 25,
        margin: 10,
        //paddingHorizontal: 20,
        //marginVertical: 10,
        justifyContent: "center",
    },
    LoginButtonText: {
        fontSize: 20,
        color: 'white',
        //fontWeight: '500',
        textAlign: 'center',
        fontFamily: 'Acme-Regular',
    },
    Lbl_PlaceHolder_Color: {
        color: 'gray',
    },

});
