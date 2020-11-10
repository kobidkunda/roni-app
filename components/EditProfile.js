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
    TextInput,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
} from 'react-native';

import DatePicker from 'react-native-datepicker';
import AnimateLoadingButton from 'react-native-animate-loading-button';

import ImagePicker from 'react-native-image-picker';
import SQLite from "react-native-sqlite-storage";
import Loading from './Loading';
import DropDown from './DropDown';

class EditProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            DB_Object: {},
            filePath: {},
            DetailsUser_Array: [],
            RestaurantCategory_Array: [],
            TradesAssistance_Array: [],
            RetailShops_Array: [],
            FoodsServed_Array: [],
            CountryCode_Array: [],
            isCountryCodePopUpOpen: false,
            CountryList_Array: [],
            StateList_Array: [],
            CitiesList_Array: [],
            LKnownSpeak_Array: [],
            LKnownWrite_Array: [],
            Skill_Array: [],
            EDQualification_Array: [],
            CountryName: '',
            CountryID: '',
            StateName: '',
            StateID: '',
            CityName: '',
            CityID: '',
            isLoading: false,
            photo_Loading: false,
            isPopUpOpen: false,
            isGenderPopUpOpen: false,
            isJobTypePopUpOpen: false,
            isJobTimePopUpOpen: false,
            isPreWorkRegionPopUpOpen: false,
            isDistanceFromHomePopUpOpen: false,
            isCountryListPopUpOpen: false,
            isStateListPopUpOpen: false,
            isCitiesListPopUpOpen: false,
            isMultiSelectPopUpOpen: false,
            isFoodsMultiSelectPopUpOpen: false,
            isLanguageKnownSpeakMultiSelectPopUpOpen: false,
            isLanguageKnownWriteMultiSelectPopUpOpen: false,
            isSkillMultiSelectPopUpOpen: false,
            isEQualificationMultiSelectPopUpOpen: false,
        };
    }

    componentDidMount() {

        this.setState({
            DetailsUser_Array: JSON.parse(JSON.stringify(this.props.appdata.userDetails)),
            CountryName: '',
            CountryID: '',
            StateName: '',
            StateID: '',
            CityName: '',
            CityID: '',
            isLoading: false,
            photo_Loading: false,
            isPopUpOpen: false,
            isGenderPopUpOpen: false,
            isJobTypePopUpOpen: false,
            isJobTimePopUpOpen: false,
            isPreWorkRegionPopUpOpen: false,
            isDistanceFromHomePopUpOpen: false,
            isCountryListPopUpOpen: false,
            isStateListPopUpOpen: false,
            isCitiesListPopUpOpen: false,
            RestaurantCategory_Array: [],
            TradesAssistance_Array: [],
            RetailShops_Array: [],
            FoodsServed_Array: [],
            CountryCode_Array: [],
            isCountryCodePopUpOpen: false,
            CountryList_Array: [],
            StateList_Array: [],
            CitiesList_Array: [],
            LKnownSpeak_Array: this.props.appdata.Language_Array,
            LKnownWrite_Array: this.props.appdata.Language_Array,
            Skill_Array: this.props.appdata.AllSkills_Array,
            EDQualification_Array: this.props.appdata.EQualification_Array,
            isMultiSelectPopUpOpen: false,
            isFoodsMultiSelectPopUpOpen: false,
            isLanguageKnownSpeakMultiSelectPopUpOpen: false,
            isLanguageKnownWriteMultiSelectPopUpOpen: false,
            isSkillMultiSelectPopUpOpen: false,
            isEQualificationMultiSelectPopUpOpen: false,
        }, () => {

            // console.log("The details is : ========>>>>>>> ", this.state.DetailsUser_Array );

            if(this.state.DetailsUser_Array[0].job_seeker_industry_type.trim() == "Trades Assistance") {
                const detailArray = [...this.state.DetailsUser_Array];
                detailArray[0].job_seeker_industry_type = "Trades & Assistance";
                detailArray[0].job_seeker_jt_restaurant_cat = detailArray[0].job_seeker_jt_trades_assi;
                this.setState({
                    DetailsUser_Array: detailArray,
                })
            }

            if(this.state.DetailsUser_Array[0].job_seeker_industry_type.trim() == "Retail Shops") {
                const detailArray = [...this.state.DetailsUser_Array];
                detailArray[0].job_seeker_jt_restaurant_cat = detailArray[0].job_seeker_jt_retail_shops;
                this.setState({
                    DetailsUser_Array: detailArray,
                })
            }

            /* ------------------------------------------------------------- */
            /* ------------------------------------------------------------- */
            /* ------------------------------------------------------------- */

            if(this.state.DetailsUser_Array[0].job_seeker_job_type.trim() == "Part-Time") {

                const detailArray = [...this.state.DetailsUser_Array];
                detailArray[0].job_seeker_job_type_time = detailArray[0].job_seeker_job_type_time;
                this.setState({
                    DetailsUser_Array: detailArray,
                })
            } else if(this.state.DetailsUser_Array[0].job_seeker_job_type.trim() == "Full-Time") {

                const detailArray = [...this.state.DetailsUser_Array];
                detailArray[0].job_seeker_job_type_time = detailArray[0].job_seeker_full_job_type_time;
                this.setState({
                    DetailsUser_Array: detailArray,
                })
            } else if(this.state.DetailsUser_Array[0].job_seeker_job_type.trim() == "Seasonal") {

                const detailArray = [...this.state.DetailsUser_Array];
                detailArray[0].job_seeker_job_type_time = detailArray[0].job_seeker_seasonal_job_type_time;
                this.setState({
                    DetailsUser_Array: detailArray,
                })
            } else if(this.state.DetailsUser_Array[0].job_seeker_job_type.trim() == "Only-Weekends") {

                const detailArray = [...this.state.DetailsUser_Array];
                detailArray[0].job_seeker_job_type_time = detailArray[0].job_seeker_onlyweekend_job_type_time;
                this.setState({
                    DetailsUser_Array: detailArray,
                })
            }


        });

        /*
        SQLite.openDatabase({
            name: 'ijobsDB.sqlite',
            createFromLocation: "~www/ijobsDB.sqlite",
            location: 'default',//'Library'
        })
        */

        SQLite.DEBUG(true);
        SQLite.enablePromise(true);

        SQLite.openDatabase({
            name: 'ijobsDB.sqlite',
            createFromLocation: "~www/ijobsDB.sqlite",
            //location: 'Library',//'default',
        }).then((db) => {
            console.log("Database open!");
            //Alert.alert('Database open!')

            this.setState({
                DB_Object: db,
            });

            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM countries WHERE cID = ?', [this.state.DetailsUser_Array[0].job_seeker_country_name], (tx, results) => {
                    console.log("Query completed", JSON.stringify(results.rows.item(0).cName));
                    this.setState({
                        CountryName: results.rows.item(0).cName,
                        CountryID: this.state.DetailsUser_Array[0].job_seeker_country_name,
                    });

                    this.getStateListfrom_CountriesID(this.state.DetailsUser_Array[0].job_seeker_country_name)
                });

                tx.executeSql('SELECT * FROM states WHERE sa_ID = ?', [this.state.DetailsUser_Array[0].job_seeker_state_name], (tx, results) => {
                    console.log("Query completed ====>>>> ", JSON.stringify(results.rows.item(0).sa_Name));
                    this.setState({
                        StateName: results.rows.item(0).sa_Name,
                        StateID: this.state.DetailsUser_Array[0].job_seeker_state_name,
                    });

                    this.getCitiesListfrom_StateID(this.state.DetailsUser_Array[0].job_seeker_state_name)

                });

                tx.executeSql('SELECT * FROM cities WHERE ci_ID = ?', [this.state.DetailsUser_Array[0].job_seeker_city], (tx, results) => {
                    console.log("Query completed ====>>>> ", JSON.stringify(results.rows.item(0).rc_Name));
                    this.setState({
                        CityName: results.rows.item(0).ci_Name,
                        CityID: this.state.DetailsUser_Array[0].job_seeker_city,
                    });

                });

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

                tx.executeSql('SELECT * FROM countries', [], (tx, results) => {

                    var tempArray = []
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        tempArray.push({ id: i.toString(), clas_nam: row.cName, isSelect: false })
                    }

                    this.setState({
                        CountryList_Array: tempArray,
                    });
                });
            });
        });
    }



    openPhotoGalaryOrCamera = () => {

        console.log('openPhotoGalaryOrCamera = ');
        var options = {
            title: 'Select an Image',
            customButtons: [

            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                Alert.alert(response.customButton);
            } else {
                let source = response;
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    filePath: source,
                });
            }
        });
    }

    isEmptyObj = (obj) => {
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        if (obj == null) return true;
        if (obj.length > 0) return false;
        if (obj.length === 0) return true;
        if (typeof obj !== "object") return true;
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    }

    getCountriesIdfromName = (CountriesName) => {
        this.state.DB_Object.transaction((tx) => {
            tx.executeSql('SELECT * FROM countries WHERE cName = ?', [CountriesName], (tx, results) => {
                console.log("Query completed", JSON.stringify(results.rows.item(0).cID));
                this.setState({
                    CountryID: results.rows.item(0).cID,
                });

                this.getStateListfrom_CountriesID(results.rows.item(0).cID)
            });
        });
    }

    getStateIdfromName = (StateName) => {
        this.state.DB_Object.transaction((tx) => {
            tx.executeSql('SELECT * FROM states WHERE sa_Name = ?', [StateName], (tx, results) => {
                console.log("Query completed", JSON.stringify(results.rows.item(0).sa_ID));
                this.setState({
                    StateID: results.rows.item(0).sa_ID,
                });

                this.getCitiesListfrom_StateID(results.rows.item(0).sa_ID)
            });
        });
    }

    getCityIdfromName = (CityName) => {
        this.state.DB_Object.transaction((tx) => {
            tx.executeSql('SELECT * FROM cities WHERE ci_Name = ?', [CityName], (tx, results) => {
                console.log("Query completed", JSON.stringify(results.rows.item(0).ci_ID));
                this.setState({
                    CityID: results.rows.item(0).ci_ID,
                });

                this.getCitiesListfrom_StateID(results.rows.item(0).sa_ID)
            });
        });
    }

    getStateListfrom_CountriesID = (CountriesID) => {
        this.state.DB_Object.transaction((tx) => {
            tx.executeSql('SELECT * FROM states WHERE sa_Code = ?', [CountriesID], (tx, results) => {
                var tempArray = []
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                    tempArray.push({ id: i.toString(), clas_nam: row.sa_Name, isSelect: false })
                }
                this.setState({
                    StateList_Array: tempArray,
                });
            });
        });
    }

    getCitiesListfrom_StateID = (StateID) => {
        this.state.DB_Object.transaction((tx) => {
            tx.executeSql('SELECT * FROM cities WHERE ci_Code = ?', [StateID], (tx, results) => {
                var tempArray = []
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                    tempArray.push({ id: i.toString(), clas_nam: row.ci_Name, isSelect: false })
                }
                this.setState({
                    CitiesList_Array: tempArray,
                });
            });
        });
    }

    async post_ProfileData() {

        var postData = new FormData();
        postData.append('job_seeker_id', this.props.appdata.userDetails[0].job_seeker_id);
        postData.append('job_seeker_name', this.state.DetailsUser_Array[0].job_seeker_name.trim());
        postData.append('job_seeker_email_id', this.state.DetailsUser_Array[0].job_seeker_email_id.trim());
        postData.append('job_seeker_mobile_code', this.state.DetailsUser_Array[0].job_seeker_mobile_code.trim());
        postData.append('job_seeker_mobile_number', this.state.DetailsUser_Array[0].job_seeker_mobile_number.trim());
        postData.append('job_seeker_gender', this.state.DetailsUser_Array[0].job_seeker_gender.trim());
        // postData.append('job_seeker_age', this.state.DetailsUser_Array[0].job_seeker_age.trim());
        postData.append('job_seeker_dob', this.state.DetailsUser_Array[0].job_seeker_dob.trim());
        postData.append('job_seeker_job_type', this.state.DetailsUser_Array[0].job_seeker_job_type.trim());

        postData.append('job_seeker_job_type_time',
            this.state.DetailsUser_Array[0].job_seeker_job_type.trim() == "Part-Time" ?
                this.state.DetailsUser_Array[0].job_seeker_job_type_time.trim() : "");

        postData.append('job_seeker_full_job_type_time',
            this.state.DetailsUser_Array[0].job_seeker_job_type.trim() == "Full-Time" ?
                this.state.DetailsUser_Array[0].job_seeker_job_type_time.trim() : "");

        postData.append('job_seeker_seasonal_job_type_time',
            this.state.DetailsUser_Array[0].job_seeker_job_type.trim() == "Seasonal" ?
                this.state.DetailsUser_Array[0].job_seeker_job_type_time.trim() : "");

        postData.append('job_seeker_onlyweekend_job_type_time',
            this.state.DetailsUser_Array[0].job_seeker_job_type.trim() == "Only-Weekends" ?
                this.state.DetailsUser_Array[0].job_seeker_job_type_time.trim() : "");

        postData.append('job_seeker_location', this.state.DetailsUser_Array[0].job_seeker_location.trim());


        postData.append('job_seeker_industry_type',
            this.state.DetailsUser_Array[0].job_seeker_industry_type.trim() == "Trades & Assistance" ?
                "Trades Assistance" : this.state.DetailsUser_Array[0].job_seeker_industry_type.trim());


        postData.append('job_seeker_jt_restaurant_cat',
            this.state.DetailsUser_Array[0].job_seeker_industry_type.trim() == "Restaurant" ?
                this.state.DetailsUser_Array[0].job_seeker_jt_restaurant_cat.trim() : "");

        postData.append('job_seeker_type_of_food_served',
            this.state.DetailsUser_Array[0].job_seeker_industry_type.trim() == "Restaurant" ?
                this.state.DetailsUser_Array[0].job_seeker_type_of_food_served.trim() : "");

        postData.append('job_seeker_jt_trades_assi',
            this.state.DetailsUser_Array[0].job_seeker_industry_type.trim() == "Trades & Assistance" ?
                this.state.DetailsUser_Array[0].job_seeker_jt_restaurant_cat.trim() : "");

        postData.append('job_seeker_jt_retail_shops',
            this.state.DetailsUser_Array[0].job_seeker_industry_type.trim() == "Retail Shops" ?
                this.state.DetailsUser_Array[0].job_seeker_jt_restaurant_cat.trim() : "");

        postData.append('job_seeker_experience_years', this.state.DetailsUser_Array[0].job_seeker_experience_years.trim());
        postData.append('job_seeker_experience_Month', this.state.DetailsUser_Array[0].job_seeker_experience_Month.trim());
        postData.append('job_seeker_current_work_location', this.state.DetailsUser_Array[0].job_seeker_current_work_location.trim());
        postData.append('job_seeker_language_known_speak', this.state.DetailsUser_Array[0].job_seeker_language_known_speak.trim());
        postData.append('job_seeker_language_known_write', this.state.DetailsUser_Array[0].job_seeker_language_known_write.trim());
        postData.append('job_seeker_current_employer', this.state.DetailsUser_Array[0].job_seeker_current_employer.trim());
        postData.append('job_seeker_skill', this.state.DetailsUser_Array[0].job_seeker_skill.trim());
        postData.append('job_seeker_educational_qualification', this.state.DetailsUser_Array[0].job_seeker_educational_qualification.trim());
        postData.append('job_seeker_additional_information', this.state.DetailsUser_Array[0].job_seeker_additional_information.trim());
        postData.append('job_seeker_carrier_objective', this.state.DetailsUser_Array[0].job_seeker_carrier_objective.trim());

        postData.append('job_seeker_country_name', this.state.CountryID);
        postData.append('job_seeker_state_name', this.state.StateID);
        postData.append('job_seeker_city', this.state.CityID);

        postData.append('preferred_work_region', this.state.DetailsUser_Array[0].preferred_work_region.trim());
        postData.append('distance_from_home', this.state.DetailsUser_Array[0].distance_from_home.trim());

        if (this.isEmptyObj(this.state.filePath)) {
            postData.append('job_seeker_profile_photo', '');
        } else {
            postData.append('job_seeker_profile_photo', {
                uri: this.state.filePath.uri,
                type: this.state.filePath.type,
                name: this.state.filePath.fileName,
                data: this.state.filePath.data
            });
        }

        console.log('postData :- ', JSON.stringify(postData));

        const response = await fetch("http://ijobs.shop/webservice/edit_reg_form.php", {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
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
            //Alert.alert('Warning', e)
        }

    }

    SaveProfileData = () => {
        if (this.state.DetailsUser_Array[0].job_seeker_name.trim() == "") {
            Alert.alert('Warning', 'Please enter full name.')

        } else if (this.state.DetailsUser_Array[0].job_seeker_email_id.trim() == "") {
            Alert.alert('Warning', 'Please enter email.')

        } else if (this.state.DetailsUser_Array[0].job_seeker_gender.trim() == "") {
            Alert.alert('Warning', 'Please select gender.')

        } else if (this.state.DetailsUser_Array[0].job_seeker_mobile_code.trim() == "") {
            Alert.alert('Warning', 'Please enter mobile code.')

        } else if (this.state.DetailsUser_Array[0].job_seeker_mobile_number.trim() == "") {
            Alert.alert('Warning', 'Please enter mobile number.')

        } 
        // else if (this.state.DetailsUser_Array[0].job_seeker_age.trim() == "") {
        //     Alert.alert('Warning', 'Please enter age.')

        // } 
        else if (this.state.DetailsUser_Array[0].job_seeker_dob.trim() == "") {
            Alert.alert('Warning', 'Please select date of birth.')

        } else if (this.state.DetailsUser_Array[0].job_seeker_job_type.trim() == "") {
            Alert.alert('Warning', 'Please select job type.')

        } else if (this.state.DetailsUser_Array[0].job_seeker_job_type_time.trim() == "") {
            Alert.alert('Warning', 'Please select job type time.')

        } else if (this.state.DetailsUser_Array[0].job_seeker_current_employer.trim() == "") {
            Alert.alert('Warning', 'Please enter current employer.')

        } else if (this.state.DetailsUser_Array[0].job_seeker_location.trim() == "") {
            Alert.alert('Warning', 'Please enter type of location.')

        } else if (this.state.DetailsUser_Array[0].job_seeker_industry_type.trim() == "") {
            Alert.alert('Warning', 'Please select industry type.')

        } else if (this.state.DetailsUser_Array[0].job_seeker_jt_restaurant_cat.trim() == "") {
            Alert.alert('Warning', 'Please select job type.')

        } else if (this.state.DetailsUser_Array[0].job_seeker_industry_type.trim() == "Restaurant"
            && this.state.DetailsUser_Array[0].job_seeker_type_of_food_served.trim() == "") {
            Alert.alert('Warning', 'Please select an option type of foods served.')

        } else if (this.state.DetailsUser_Array[0].job_seeker_experience_years.trim() == "") {
            Alert.alert('Warning', 'Please enter valid experience.')

        } else if (this.state.DetailsUser_Array[0].job_seeker_experience_Month.trim() == "") {
            Alert.alert('Warning', 'Please enter valid experience.')

        } else if (this.state.DetailsUser_Array[0].job_seeker_current_work_location.trim() == "") {
            Alert.alert('Warning', 'Please enter current work location.')

        } else if (this.state.DetailsUser_Array[0].job_seeker_language_known_speak.trim() == "") {
            Alert.alert('Warning', 'Please select language known(speak).')

        } else if (this.state.DetailsUser_Array[0].job_seeker_language_known_write.trim() == "") {
            Alert.alert('Warning', 'Please select language known(write).')

        } else if (this.state.DetailsUser_Array[0].job_seeker_skill.trim() == "") {
            Alert.alert('Warning', 'Please select skill.')

        } else if (this.state.DetailsUser_Array[0].job_seeker_educational_qualification.trim() == "") {
            Alert.alert('Warning', 'Please select educational qualification.')

        } else if (this.state.DetailsUser_Array[0].distance_from_home.trim() == "") {
            Alert.alert('Warning', 'Please select distance from home.')

        } else if (this.state.DetailsUser_Array[0].job_seeker_additional_information.trim() == "") {
            Alert.alert('Warning', 'Please enter additional information.')

        } else if (this.state.DetailsUser_Array[0].job_seeker_carrier_objective.trim() == "") {
            Alert.alert('Warning', 'Please enter carrier objective.')

        } else if (this.state.DetailsUser_Array[0].preferred_work_region.trim() == "") {
            Alert.alert('Warning', 'Please select work region.')

        } else if (this.state.CountryName.trim() == "") {
            Alert.alert('Warning', 'Please select country.')

        } else if (this.state.StateName.trim() == "") {
            Alert.alert('Warning', 'Please select state.')

        } else if (this.state.CityName.trim() == "") {
            Alert.alert('Warning', 'Please select city.')

        } else {
            this.webServiceCalling()
        }
    }

    webServiceCalling = () => {

        this.loadingButton.showLoading(true);
        //this.setState({ isLoading: true });
        this.post_ProfileData()
            .catch(() => {
                this.loadingButton.showLoading(false);

                setTimeout(function () {
                    Alert.alert('Warning', 'No internet connection')
                }.bind(this), 2)

            })
            .then((data) => {

                //this.setState({ isLoading: false });
                console.log('data:- ', data.success);
                this.loadingButton.showLoading(false);

                if (parseInt(data.success) == 1) {
                    Alert.alert('Success', data.details)
                    this.props.updateUserDetilas(this.state.DetailsUser_Array);
                    if (!this.isEmptyObj(this.state.filePath)) {
                        this.props.updateUserImage(data.profile_image);
                    }
                } else {
                    Alert.alert('Error', 'error during processing.')
                }
            });
    }

    onLoadSpinner = () => {
        this.setState({ photo_Loading: true });
        console.log("onLoadSpinner ===>>>> ")
    }
    onLoadEndSpinner = () => {
        this.setState({ photo_Loading: false });
        console.log("onLoadEndSpinner ===>>>> ")
    }

    updateTrue_Gender_PopUpState = () => {
        this.setState({ isGenderPopUpOpen: true });
    }

    update_Gender_PopUpState = newData => {
        console.log("newData ===>>", JSON.stringify(newData))
        if (newData.roleText != "") {
            const newArray = [...this.state.DetailsUser_Array];
            newArray[0].job_seeker_gender = newData.roleText;
            this.setState({ DetailsUser_Array: newArray });
        }

        this.setState({ isGenderPopUpOpen: false });
    }

    updateTrue_CountryCode_PopUpState = () => {
        console.log("updateTrue_CountryCode_PopUpState ===>>");

        if( this.state.CountryCode_Array.length == 0 ) {
            this.callingCountryCodeAPI();
        } else {
            this.setState({ isCountryCodePopUpOpen: true });
        }
        
    }

    update_CountryCode_PopUpState = newData => {
        console.log("newData ===>>", JSON.stringify(newData))
        if (newData.roleText != "") {

            const fetchNwData = this.state.CountryCode_Array.filter(arrayObj => arrayObj.clas_nam === newData.roleText);
            // console.log("fetchNwData ===>>", fetchNwData);

            const newArray = [...this.state.DetailsUser_Array];
            newArray[0].job_seeker_mobile_code = fetchNwData[0].phonecode;
            this.setState({ DetailsUser_Array: newArray });
        }

        this.setState({ isCountryCodePopUpOpen: false });
    }

    callingCountryCodeAPI = () => {
        this.setState({ isLoading: true });
        this.getCountryCodeData()
            .catch(() => {
                
                this.setState({ isLoading: false });
                setTimeout(function () {
                    Alert.alert('Warning', 'No internet connection')
                }.bind(this), 2)

            })
            .then((data) => {

                this.setState({ isLoading: false });
                // console.log('GetCountryCodeData data:- ', data);

                if (data.length > 0) {

                    const arrayContryCode = data.map((dataObj, index) => {
                        return {
                            id: index.toString(),
                            clas_nam: dataObj.countryname,
                            phonecode: dataObj.phonecode,
                            isSelect: false,
                        }
                    });
    
                    // console.log('arrayContryCode data:- ', arrayContryCode);
    
                    this.setState({
                        CountryCode_Array: arrayContryCode
                    }, () => {
                        this.setState({ isCountryCodePopUpOpen: true });
                    });

                } else {
                    Alert.alert('Error', 'error during processing.')
                }
            });
    }

    async getCountryCodeData() {

        const response = await fetch("http://ijobs.shop/webservice/get_country_phone_code.php");

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

    updateTrue_JobType_PopUpState = () => {
        this.setState({ isJobTypePopUpOpen: true });
    }

    update_JobType_PopUpState = newData => {
        console.log("newData ===>>", JSON.stringify(newData))
        if (newData.roleText != "") {
            const newArray = [...this.state.DetailsUser_Array];
            newArray[0].job_seeker_job_type = newData.roleText;
            newArray[0].job_seeker_job_type_time = '';
            this.setState({ DetailsUser_Array: newArray });
        }

        this.setState({ isJobTypePopUpOpen: false });
    }

    updateTrue_JobTime_PopUpState = () => {
        this.setState({ isJobTimePopUpOpen: true });
    }

    update_JobTime_PopUpState = newData => {
        console.log("newData ===>>", JSON.stringify(newData))
        if (newData.roleText != "") {
            const newArray = [...this.state.DetailsUser_Array];
            newArray[0].job_seeker_job_type_time = newData.roleText;
            this.setState({ DetailsUser_Array: newArray });
        }

        this.setState({ isJobTimePopUpOpen: false });
    }

    updateTrue_PreWorkRegion_PopUpState = () => {
        this.setState({ isPreWorkRegionPopUpOpen: true });
    }

    update_PreWorkRegion_PopUpState = newData => {
        console.log("newData ===>>", JSON.stringify(newData))
        if (newData.roleText != "") {
            const newArray = [...this.state.DetailsUser_Array];
            newArray[0].preferred_work_region = newData.roleText;
            this.setState({ DetailsUser_Array: newArray });
        }

        this.setState({ isPreWorkRegionPopUpOpen: false });
    }

    updateTrue_DistanceFromHome_PopUpState = () => {
        this.setState({ isDistanceFromHomePopUpOpen: true });
    }

    update_DistanceFromHome_PopUpState = newData => {
        console.log("newData ===>>", JSON.stringify(newData))
        if (newData.roleText != "") {
            const newArray = [...this.state.DetailsUser_Array];
            newArray[0].distance_from_home = newData.roleText;
            this.setState({ DetailsUser_Array: newArray });
        }

        this.setState({ isDistanceFromHomePopUpOpen: false });
    }

    updateTrue_CountryList_PopUpState = () => {
        this.setState({ isCountryListPopUpOpen: true });
    }

    update_CountryList_PopUpState = newData => {
        console.log("newData ===>>", JSON.stringify(newData))
        if (newData.roleText != "") {
            this.setState({ CountryName: newData.roleText, StateName: '', CityName: '', });
            this.getCountriesIdfromName(newData.roleText)
        }

        this.setState({ isCountryListPopUpOpen: false });
    }

    updateTrue_StateList_PopUpState = () => {
        this.setState({ isStateListPopUpOpen: true });
    }

    update_StateList_PopUpState = newData => {
        console.log("newData ===>>", JSON.stringify(newData))
        if (newData.roleText != "") {
            this.setState({ StateName: newData.roleText, CityName: '', });
            this.getStateIdfromName(newData.roleText)
        }

        this.setState({ isStateListPopUpOpen: false });
    }

    updateTrue_CityList_PopUpState = () => {
        if (this.state.StateName.trim() != "") {
            this.setState({ isCitiesListPopUpOpen: true });
        } else {
            Alert.alert('Warning', 'Please select state.')
        }

    }

    update_CityList_PopUpState = newData => {
        console.log("newData ===>>", JSON.stringify(newData))
        if (newData.roleText != "") {
            this.setState({ CityName: newData.roleText, });
            this.getCityIdfromName(newData.roleText)
        }

        this.setState({ isCitiesListPopUpOpen: false });
    }

    updateTruePopUpState = () => {
        this.setState({ isPopUpOpen: true });
    }

    updatePopUpState = newData => {
        console.log("newData ===>>", JSON.stringify(newData))
        if (newData.roleText != "") {
            const newArray = [...this.state.DetailsUser_Array];
            newArray[0].job_seeker_industry_type = newData.roleText;
            newArray[0].job_seeker_jt_restaurant_cat = '';
            newArray[0].job_seeker_type_of_food_served = '';
            this.setState({ DetailsUser_Array: newArray });
        }

        this.setState({ isPopUpOpen: false });
    }

    updateTrue_MultiSelect_PopUpState = () => {
        this.setState({ isMultiSelectPopUpOpen: true });
    }

    update_MultiSelect_PopUpState = newData => {
        console.log("newData ===>>", JSON.stringify(newData))
        if (newData.roleText != "") {
            const newArray = [...this.state.DetailsUser_Array];
            newArray[0].job_seeker_jt_restaurant_cat = newData.roleText;
            this.setState({ DetailsUser_Array: newArray });
        }

        this.setState({ isMultiSelectPopUpOpen: false });
    }

    updateTrue_Foods_MultiSelect_PopUpState = () => {
        this.setState({ isFoodsMultiSelectPopUpOpen: true });
    }

    update_Foods_MultiSelect_PopUpState = newData => {
        console.log("newData ===>>", JSON.stringify(newData))
        if (newData.roleText != "") {
            const newArray = [...this.state.DetailsUser_Array];
            newArray[0].job_seeker_type_of_food_served = newData.roleText;
            this.setState({ DetailsUser_Array: newArray });
        }

        this.setState({ isFoodsMultiSelectPopUpOpen: false });
    }

    updateTrue_LanguageKnownSpeak_MultiSelect_PopUpState = () => {
        this.setState({ isLanguageKnownSpeakMultiSelectPopUpOpen: true });
    }

    update_LanguageKnownSpeak_MultiSelect_PopUpState = newData => {
        console.log("newData ===>>", JSON.stringify(newData))
        if (newData.roleText != "") {
            const newArray = [...this.state.DetailsUser_Array];
            newArray[0].job_seeker_language_known_speak = newData.roleText;
            this.setState({ DetailsUser_Array: newArray });
        }

        this.setState({ isLanguageKnownSpeakMultiSelectPopUpOpen: false });
    }

    
    updateTrue_LanguageKnownWrite_MultiSelect_PopUpState = () => {
        this.setState({ isLanguageKnownWriteMultiSelectPopUpOpen: true });
    }

    update_LanguageKnownWrite_MultiSelect_PopUpState = newData => {
        console.log("newData ===>>", JSON.stringify(newData))
        if (newData.roleText != "") {
            const newArray = [...this.state.DetailsUser_Array];
            newArray[0].job_seeker_language_known_write = newData.roleText;
            this.setState({ DetailsUser_Array: newArray });
        }

        this.setState({ isLanguageKnownWriteMultiSelectPopUpOpen: false });
    }

    updateTrue_Skill_MultiSelect_PopUpState = () => {
        this.setState({ isSkillMultiSelectPopUpOpen: true });
    }

    update_Skill_MultiSelect_PopUpState = newData => {
        console.log("newData ===>>", JSON.stringify(newData))
        if (newData.roleText != "") {
            const newArray = [...this.state.DetailsUser_Array];
            newArray[0].job_seeker_skill = newData.roleText;
            this.setState({ DetailsUser_Array: newArray });
        }

        this.setState({ isSkillMultiSelectPopUpOpen: false });
    }

    updateTrue_EQualification_MultiSelect_PopUpState = () => {
        this.setState({ isEQualificationMultiSelectPopUpOpen: true });
    }

    update_EQualification_MultiSelect_PopUpState = newData => {
        console.log("newData ===>>", JSON.stringify(newData))
        if (newData.roleText != "") {
            const newArray = [...this.state.DetailsUser_Array];
            newArray[0].job_seeker_educational_qualification = newData.roleText;
            this.setState({ DetailsUser_Array: newArray });
        }

        this.setState({ isEQualificationMultiSelectPopUpOpen: false });
    }

    static navigationOptions = ({ navigation }) => ({

        title: 'Edit Profile',
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
        //console.log("Profiles state ===<<<< ", JSON.stringify(this.state.DetailsUser_Array))
        //console.log("Profiles props ===>>>> ", JSON.stringify(this.props.appdata.userDetails))
        return (
            <Fragment>
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


                        <View style={{ flex: 1, margin: 10, marginBottom: 0, alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row', }} >

                            {this.state.DetailsUser_Array.length > 0 ?

                                <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }}
                                    behavior={(Platform.OS === 'ios') ? "padding" : null} enabled keyboardVerticalOffset={150} >
                                    <ScrollView style={{ flex: 1 }}
                                        bounces={false}>

                                        <View style={{ flex: 1, alignItems: 'center', margin: 10, }}>
                                            <TouchableOpacity style={{ alignItems: 'center', }} onPress={() => this.openPhotoGalaryOrCamera()}>
                                                <View style={styles.View_Shadow_Circle_BG}>
                                                    <View style={styles.View_Circle_BG}>

                                                        <Image
                                                            //source={require('../images/userProfile.png')}
                                                            source={this.isEmptyObj(this.state.filePath) ?
                                                                this.props.appdata.userImage_Profile.uri == "" ?
                                                                    require('../images/userProfile.png') :
                                                                    this.props.appdata.userImage_Profile
                                                                : this.state.filePath}
                                                            style={{ width: 80, height: 80, alignSelf: 'center' }}
                                                            resizeMode='cover'
                                                            onLoad={() => this.onLoadSpinner()}
                                                            onLoadEnd={() => this.onLoadEndSpinner()}
                                                        />
                                                        {this.state.photo_Loading ?
                                                            <View style={{
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0,
                                                                bottom: 0,
                                                                right: 0,
                                                                //width: 200,
                                                                //height: 200,
                                                                backgroundColor: 'rgba(52, 52, 52, 0.6)',
                                                                justifyContent: 'center',
                                                            }}>
                                                                <ActivityIndicator></ActivityIndicator>
                                                            </View> : null}

                                                    </View>
                                                    <View style={styles.View_Camera_BG}>
                                                        <Image
                                                            source={require('../images/cameraIcon.png')}
                                                            style={{ width: 20, height: 20, alignSelf: 'center' }}
                                                            resizeMode='center'
                                                        />
                                                    </View>
                                                </View>


                                            </TouchableOpacity>
                                        </View>

                                        <View style={styles.View_Box}>
                                            <View style={[styles.gridItem]}>
                                                <Text style={styles.Lbl_Grid}>Full Name: </Text>
                                                <View style={styles.View_Box_TextField}>
                                                    <TextInput
                                                        style={styles.TextInput_ShareText}
                                                        placeholder="Enter Full Name"
                                                        placeholderTextColor='gray'
                                                        underlineColorAndroid='rgba(0,0,0,0)'
                                                        keyboardType='default'
                                                        returnKeyType='done'
                                                        autoCorrect={false}
                                                        onChangeText={text => {
                                                            const newArray = [...this.state.DetailsUser_Array];
                                                            newArray[0].job_seeker_name = text;
                                                            this.setState({ DetailsUser_Array: newArray });
                                                        }}
                                                        value={this.state.DetailsUser_Array[0].job_seeker_name}
                                                    />
                                                </View>
                                            </View>


                                            <View style={[styles.gridItem]}>
                                                <Text style={styles.Lbl_Grid}>Email: </Text>
                                                <View style={styles.View_Box_TextField}>
                                                    <TextInput
                                                        // style={styles.TextInput_ShareText}
                                                        style={styles.TextMultilineInput_ShareText}
                                                        multiline={true}
                                                        placeholder="Enter Email"
                                                        placeholderTextColor='gray'
                                                        underlineColorAndroid='rgba(0,0,0,0)'
                                                        keyboardType='email-address'
                                                        returnKeyType='done'
                                                        autoCorrect={false}
                                                        onChangeText={text => {
                                                            const newArray = [...this.state.DetailsUser_Array];
                                                            newArray[0].job_seeker_email_id = text;
                                                            this.setState({ DetailsUser_Array: newArray });
                                                        }}
                                                        value={this.state.DetailsUser_Array[0].job_seeker_email_id}
                                                    />
                                                </View>
                                            </View>


                                            <View style={[styles.gridItem]} >
                                                <Text style={styles.Lbl_Grid}>Gender: </Text>
                                                <TouchableOpacity style={styles.View_Box_TextField} onPress={() => this.updateTrue_Gender_PopUpState()}>
                                                    <Text style={this.state.DetailsUser_Array[0].job_seeker_gender.trim() != "" ? [styles.Lbl_ShareText] : [styles.Lbl_ShareText, styles.Lbl_PlaceHolder_Color]}>
                                                        {this.state.DetailsUser_Array[0].job_seeker_gender.trim() != "" ? this.state.DetailsUser_Array[0].job_seeker_gender : 'Select Gender'}
                                                    </Text>
                                                    <Image
                                                        source={require('../images/dropDImg.png')}
                                                        style={{ width: 25, height: 25, margin: 5, alignSelf: 'center' }}
                                                        resizeMode='stretch'
                                                    />
                                                </TouchableOpacity>
                                            </View>


                                            <View style={[styles.gridItem]}>
                                                <Text style={styles.Lbl_Grid}>Mobile No.: </Text>
                                                <View style={styles.View_MobileBox_TextField}>
                                                <TouchableOpacity style={{ flex:1, justifyContent: 'center',}}  onPress={() => this.updateTrue_CountryCode_PopUpState()}>
                                                        <Text 
                                                            style={this.state.DetailsUser_Array[0].job_seeker_mobile_code.trim() != "" ? [styles.Lbl_ShareText, { flex: 1, marginVertical: 10 }] : [styles.Lbl_ShareText, styles.Lbl_PlaceHolder_Color, { flex: 1, marginVertical: 10 }]}
                                                        >
                                                            {this.state.DetailsUser_Array[0].job_seeker_mobile_code.trim() != "" ? this.state.DetailsUser_Array[0].job_seeker_mobile_code : 'Code'}
                                                        </Text>
                                                        {/* <TextInput
                                                            style={styles.TextInput_ShareText}
                                                            editable={true}
                                                            placeholder="Enter Code"
                                                            placeholderTextColor='gray'
                                                            underlineColorAndroid='rgba(0,0,0,0)'
                                                            keyboardType='numbers-and-punctuation'
                                                            returnKeyType='done'
                                                            autoCorrect={false}
                                                            onChangeText={text => {
                                                                const newArray = [...this.state.DetailsUser_Array];
                                                                newArray[0].job_seeker_mobile_code = text;
                                                                this.setState({ DetailsUser_Array: newArray });
                                                            }}
                                                            value={this.state.DetailsUser_Array[0].job_seeker_mobile_code}
                                                        /> */}
                                                    </TouchableOpacity>
                                                    
                                                </View>
                                                <View style={[styles.View_Box_TextField, { marginLeft: 0, }]}>
                                                    <TextInput
                                                        style={styles.TextInput_ShareText}
                                                        editable={true}
                                                        placeholder="Enter Mobile No."
                                                        placeholderTextColor='gray'
                                                        underlineColorAndroid='rgba(0,0,0,0)'
                                                        keyboardType='numbers-and-punctuation'
                                                        returnKeyType='done'
                                                        autoCorrect={false}
                                                        onChangeText={text => {
                                                            const newArray = [...this.state.DetailsUser_Array];
                                                            newArray[0].job_seeker_mobile_number = text;
                                                            this.setState({ DetailsUser_Array: newArray });
                                                        }}
                                                        value={this.state.DetailsUser_Array[0].job_seeker_mobile_number}
                                                    />
                                                </View>
                                            </View>



                                            <View style={[styles.gridItem]}>
                                                <Text style={styles.Lbl_Grid}>Date of Birth: </Text>
                                                <View style={styles.View_Box_TextField}>
                                                    {/* <TextInput
                                                        style={styles.TextInput_ShareText}
                                                        placeholder="Enter Age"
                                                        placeholderTextColor='gray'
                                                        underlineColorAndroid='rgba(0,0,0,0)'
                                                        keyboardType='numbers-and-punctuation'
                                                        returnKeyType='done'
                                                        autoCorrect={false}
                                                        onChangeText={text => {
                                                            const newArray = [...this.state.DetailsUser_Array];
                                                            newArray[0].job_seeker_age = text;
                                                            this.setState({ DetailsUser_Array: newArray });
                                                        }}
                                                        value={this.state.DetailsUser_Array[0].job_seeker_age}

                                                    /> */}
                                                    <DatePicker
                                                        style={{width: '100%',}}
                                                        date={this.state.DetailsUser_Array[0].job_seeker_dob}
                                                        mode="date"
                                                        placeholder="Select Date"
                                                        placeholderTextColor="gray"
                                                        format="YYYY-MM-DD"
                                                        // minDate="2016-05-01"
                                                        // maxDate="2016-06-01"
                                                        confirmBtnText="Confirm"
                                                        cancelBtnText="Cancel"
                                                        customStyles={{
                                                        dateIcon: {
                                                            position: 'absolute',
                                                            right: 0,
                                                            top: 4,
                                                            marginLeft: 0
                                                        },
                                                        dateInput: {
                                                            marginLeft: 5,
                                                            borderWidth: 0,
                                                            
                                                        },
                                                        dateText: {
                                                            fontSize: 18,
                                                            color: '#1c313b',
                                                            textAlign: 'left',
                                                            alignSelf: 'flex-start',
                                                            fontFamily: 'Acme-Regular',
                                                        },
                                                        placeholderText: {
                                                            fontSize: 18,
                                                            color: 'gray',
                                                            textAlign: 'left',
                                                            alignSelf: 'flex-start',
                                                            fontFamily: 'Acme-Regular',
                                                        }
                                                        // ... You can check the source to find the other keys.
                                                        }}
                                                        onDateChange={(date) => {
                                                            const newArray = [...this.state.DetailsUser_Array];
                                                            newArray[0].job_seeker_dob = date;
                                                            this.setState({ DetailsUser_Array: newArray });
                                                        }}
                                                    />
                                                </View>
                                            </View>

                                        </View>

                                        <View style={{ flex: 1, height: 10 }}></View>

                                        <View style={styles.View_Box}>

                                            <View style={[styles.gridItem]} >
                                                <Text style={styles.Lbl_Grid}>Job Type: </Text>
                                                <TouchableOpacity style={styles.View_Box_TextField} onPress={() => this.updateTrue_JobType_PopUpState()} >
                                                    <Text style={this.state.DetailsUser_Array[0].job_seeker_job_type.trim() != "" ? [styles.Lbl_ShareText] : [styles.Lbl_ShareText, styles.Lbl_PlaceHolder_Color]}>
                                                        {this.state.DetailsUser_Array[0].job_seeker_job_type.trim() != "" ? this.state.DetailsUser_Array[0].job_seeker_job_type : 'Select Job Type'}
                                                    </Text>
                                                    <Image
                                                        source={require('../images/dropDImg.png')}
                                                        style={{ width: 25, height: 25, margin: 5, alignSelf: 'center' }}
                                                        resizeMode='stretch'
                                                    />
                                                </TouchableOpacity>
                                            </View>

                                            <View style={[styles.gridItem]}>
                                                <Text style={styles.Lbl_Grid}>
                                                    {this.state.DetailsUser_Array[0].job_seeker_job_type == "Part-Time" ||
                                                        this.state.DetailsUser_Array[0].job_seeker_job_type == "Full-Time" ? this.state.DetailsUser_Array[0].job_seeker_job_type + " job:" : this.state.DetailsUser_Array[0].job_seeker_job_type + ":"}
                                                </Text>
                                                <TouchableOpacity style={styles.View_Box_TextField} onPress={() => this.updateTrue_JobTime_PopUpState()} >
                                                    <Text style={this.state.DetailsUser_Array[0].job_seeker_job_type_time.trim() != "" ? [styles.Lbl_ShareText] : [styles.Lbl_ShareText, styles.Lbl_PlaceHolder_Color]}>
                                                        {this.state.DetailsUser_Array[0].job_seeker_job_type_time.trim() != "" ? this.state.DetailsUser_Array[0].job_seeker_job_type_time : 'Select Job Time'}
                                                    </Text>
                                                    <Image
                                                        source={require('../images/dropDImg.png')}
                                                        style={{ width: 25, height: 25, margin: 5, alignSelf: 'center' }}
                                                        resizeMode='stretch'
                                                    />
                                                </TouchableOpacity>
                                            </View>

                                            <View style={[styles.gridItem]}>
                                                <Text style={styles.Lbl_Grid}>Current Employer: </Text>
                                                <View style={styles.View_Box_TextField}>
                                                    <TextInput
                                                        style={styles.TextInput_ShareText}
                                                        placeholder="Enter Current Employer"
                                                        placeholderTextColor='gray'
                                                        underlineColorAndroid='rgba(0,0,0,0)'
                                                        keyboardType='default'
                                                        returnKeyType='done'
                                                        autoCorrect={false}
                                                        onChangeText={text => {
                                                            const newArray = [...this.state.DetailsUser_Array];
                                                            newArray[0].job_seeker_current_employer = text;
                                                            this.setState({ DetailsUser_Array: newArray });
                                                        }}
                                                        value={this.state.DetailsUser_Array[0].job_seeker_current_employer}
                                                    />
                                                </View>
                                            </View>

                                            <View style={[styles.gridItem]}>
                                                <Text style={styles.Lbl_Grid}>Type Of Location: </Text>
                                                <View style={styles.View_Box_TextField}>
                                                    <TextInput
                                                        style={styles.TextInput_ShareText}
                                                        placeholder="Enter Location"
                                                        placeholderTextColor='gray'
                                                        underlineColorAndroid='rgba(0,0,0,0)'
                                                        keyboardType='default'
                                                        returnKeyType='done'
                                                        autoCorrect={false}
                                                        onChangeText={text => {
                                                            const newArray = [...this.state.DetailsUser_Array];
                                                            newArray[0].job_seeker_location = text;
                                                            this.setState({ DetailsUser_Array: newArray });
                                                        }}
                                                        value={this.state.DetailsUser_Array[0].job_seeker_location}
                                                    />
                                                </View>
                                            </View>
                                        </View>

                                        <View style={{ flex: 1, height: 10 }}></View>

                                        <View style={styles.View_Box}>

                                            <View style={[styles.gridItem]}>
                                                <Text style={styles.Lbl_Grid}>Industry Type: </Text>
                                                <TouchableOpacity style={styles.View_Box_TextField} onPress={() => this.updateTruePopUpState()} >
                                                    <Text style={this.state.DetailsUser_Array[0].job_seeker_industry_type.trim() != "" ? [styles.Lbl_ShareText] : [styles.Lbl_ShareText, styles.Lbl_PlaceHolder_Color]}>
                                                        {this.state.DetailsUser_Array[0].job_seeker_industry_type.trim() != "" ? this.state.DetailsUser_Array[0].job_seeker_industry_type : 'Select Industry Type'}
                                                    </Text>

                                                    <Image
                                                        source={require('../images/dropDImg.png')}
                                                        style={{ width: 25, height: 25, margin: 5, alignSelf: 'center' }}
                                                        resizeMode='stretch'
                                                    />
                                                </TouchableOpacity>
                                            </View>

                                            {this.state.DetailsUser_Array[0].job_seeker_industry_type.trim() != "" ?
                                                <View style={[styles.gridItem]}>
                                                    <Text style={styles.Lbl_Grid}>Job Type {this.state.DetailsUser_Array[0].job_seeker_industry_type}: </Text>
                                                    <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', }}>
                                                        <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'center', width: 120, height: 35, margin: 5, borderRadius: 20, borderColor: '#2fa1f7', borderWidth: 1, backgroundColor: '#e3f4ff' }} onPress={() => this.updateTrue_MultiSelect_PopUpState()}>
                                                            <Text style={[styles.Lbl_ShareText, styles.Lbl_Align_Center]}>Add/Edit</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View> : null}

                                            {this.state.DetailsUser_Array[0].job_seeker_jt_restaurant_cat.trim() != "" ? <View style={[styles.gridItem]}>
                                                <Text style={styles.Lbl_Grid}>Selected Category: </Text>
                                                <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', }}>
                                                    <Text style={[styles.Lbl2_ShareText]}>{this.state.DetailsUser_Array[0].job_seeker_jt_restaurant_cat}</Text>
                                                </View>
                                            </View> : null}

                                            {this.state.DetailsUser_Array[0].job_seeker_industry_type == "Restaurant" ? <View style={[styles.gridItem]}>
                                                <Text style={styles.Lbl_Grid}>Select an Option Type of Foods Served : </Text>
                                                <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', }}>
                                                    <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'center', width: 120, height: 35, margin: 5, borderRadius: 20, borderColor: '#2fa1f7', borderWidth: 1, backgroundColor: '#e3f4ff' }} onPress={() => this.updateTrue_Foods_MultiSelect_PopUpState()}>
                                                        <Text style={[styles.Lbl_ShareText, styles.Lbl_Align_Center]}>Add/Edit</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View> : null}

                                            {this.state.DetailsUser_Array[0].job_seeker_industry_type == "Restaurant" &&
                                                this.state.DetailsUser_Array[0].job_seeker_type_of_food_served.trim() != "" ? <View style={[styles.gridItem]}>
                                                    <Text style={styles.Lbl_Grid}>Selected Category: </Text>
                                                    <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', }}>
                                                        <Text style={[styles.Lbl2_ShareText]}>{this.state.DetailsUser_Array[0].job_seeker_type_of_food_served}</Text>
                                                    </View>
                                                </View> : null}

                                        </View>

                                        <View style={styles.View_Box}>

                                            <View style={[styles.gridItem]}>
                                                <Text style={styles.Lbl_Grid}>Job Experience: </Text>
                                                <View style={styles.View_Box_TextField}>
                                                    <TextInput
                                                        style={styles.TextInput_ShareText}
                                                        placeholder="Years"
                                                        placeholderTextColor='gray'
                                                        underlineColorAndroid='rgba(0,0,0,0)'
                                                        keyboardType='numbers-and-punctuation'
                                                        returnKeyType='done'
                                                        autoCorrect={false}
                                                        onChangeText={text => {
                                                            const newArray = [...this.state.DetailsUser_Array];
                                                            newArray[0].job_seeker_experience_years = text;
                                                            this.setState({ DetailsUser_Array: newArray });
                                                        }}
                                                        value={this.state.DetailsUser_Array[0].job_seeker_experience_years}
                                                    />
                                                </View>
                                                <View style={styles.View_Box_TextField}>
                                                    <TextInput
                                                        style={styles.TextInput_ShareText}
                                                        placeholder="Months"
                                                        placeholderTextColor='gray'
                                                        underlineColorAndroid='rgba(0,0,0,0)'
                                                        keyboardType='numbers-and-punctuation'
                                                        returnKeyType='done'
                                                        autoCorrect={false}
                                                        onChangeText={text => {
                                                            const newArray = [...this.state.DetailsUser_Array];
                                                            newArray[0].job_seeker_experience_Month = text;
                                                            this.setState({ DetailsUser_Array: newArray });
                                                        }}
                                                        value={this.state.DetailsUser_Array[0].job_seeker_experience_Month}
                                                    />
                                                </View>

                                            </View>

                                            <View style={[styles.gridItem]}>
                                                <Text style={styles.Lbl_Grid}>Current Work Location: </Text>
                                                <View style={styles.View_Box_TextField}>
                                                    <TextInput
                                                        style={styles.TextInput_ShareText}
                                                        placeholder="Enter Work Location"
                                                        placeholderTextColor='gray'
                                                        underlineColorAndroid='rgba(0,0,0,0)'
                                                        keyboardType='default'
                                                        returnKeyType='done'
                                                        autoCorrect={false}
                                                        onChangeText={text => {
                                                            const newArray = [...this.state.DetailsUser_Array];
                                                            newArray[0].job_seeker_current_work_location = text;
                                                            this.setState({ DetailsUser_Array: newArray });
                                                        }}
                                                        value={this.state.DetailsUser_Array[0].job_seeker_current_work_location}
                                                    />
                                                </View>
                                            </View>

                                            {/* <View style={[styles.gridItem]}>
                                                <Text style={styles.Lbl_Grid}>Language Known(Speak): </Text>
                                                <View style={styles.View_Box_TextField}>
                                                    <TextInput
                                                        style={styles.TextInput_ShareText}
                                                        placeholder="Enter Language"
                                                        placeholderTextColor='gray'
                                                        underlineColorAndroid='rgba(0,0,0,0)'
                                                        keyboardType='default'
                                                        returnKeyType='done'
                                                        autoCorrect={false}
                                                        onChangeText={text => {
                                                            const newArray = [...this.state.DetailsUser_Array];
                                                            newArray[0].job_seeker_language_known_speak = text;
                                                            this.setState({ DetailsUser_Array: newArray });
                                                        }}
                                                        value={this.state.DetailsUser_Array[0].job_seeker_language_known_speak}
                                                    />
                                                </View>
                                            </View> */}

                                            <View style={[styles.gridItem]}>
                                                <Text style={styles.Lbl_Grid}>Language Known(Speak):</Text>
                                                <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', }}>
                                                    <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'center', width: 120, height: 35, margin: 5, borderRadius: 20, borderColor: '#2fa1f7', borderWidth: 1, backgroundColor: '#e3f4ff' }} 
                                                    onPress={() => this.updateTrue_LanguageKnownSpeak_MultiSelect_PopUpState()}>
                                                        <Text style={[styles.Lbl_ShareText, styles.Lbl_Align_Center]}>Add/Edit</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                            {this.state.DetailsUser_Array[0].job_seeker_language_known_speak.trim() != "" ? <View style={[styles.gridItem]}>
                                                <Text style={styles.Lbl_Grid}>Selected Language: </Text>
                                                <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', }}>
                                                    <Text style={[styles.Lbl2_ShareText]}>{this.state.DetailsUser_Array[0].job_seeker_language_known_speak}</Text>
                                                </View>
                                            </View> : null}

                                            {/* <View style={[styles.gridItem]}>
                                                <Text style={styles.Lbl_Grid}>Language Known(Write): </Text>
                                                <View style={styles.View_Box_TextField}>
                                                    <TextInput
                                                        style={styles.TextInput_ShareText}
                                                        placeholder="Enter Language"
                                                        placeholderTextColor='gray'
                                                        underlineColorAndroid='rgba(0,0,0,0)'
                                                        keyboardType='default'
                                                        returnKeyType='done'
                                                        autoCorrect={false}
                                                        onChangeText={text => {
                                                            const newArray = [...this.state.DetailsUser_Array];
                                                            newArray[0].job_seeker_language_known_write = text;
                                                            this.setState({ DetailsUser_Array: newArray });
                                                        }}
                                                        value={this.state.DetailsUser_Array[0].job_seeker_language_known_write}
                                                    />
                                                </View>
                                            </View> */}

                                            <View style={[styles.gridItem]}>
                                                <Text style={styles.Lbl_Grid}>Language Known(Write):</Text>
                                                <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', }}>
                                                    <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'center', width: 120, height: 35, margin: 5, borderRadius: 20, borderColor: '#2fa1f7', borderWidth: 1, backgroundColor: '#e3f4ff' }} 
                                                    onPress={() => this.updateTrue_LanguageKnownWrite_MultiSelect_PopUpState()}>
                                                        <Text style={[styles.Lbl_ShareText, styles.Lbl_Align_Center]}>Add/Edit</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                            {this.state.DetailsUser_Array[0].job_seeker_language_known_write.trim() != "" ? <View style={[styles.gridItem]}>
                                                <Text style={styles.Lbl_Grid}>Selected Language: </Text>
                                                <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', }}>
                                                    <Text style={[styles.Lbl2_ShareText]}>{this.state.DetailsUser_Array[0].job_seeker_language_known_write}</Text>
                                                </View>
                                            </View> : null}



                                            <View style={[styles.gridItem]}>
                                                <Text style={styles.Lbl_Grid}>Skill : </Text>
                                                <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', }}>
                                                    <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'center', width: 120, height: 35, margin: 5, borderRadius: 20, borderColor: '#2fa1f7', borderWidth: 1, backgroundColor: '#e3f4ff' }} onPress={() => this.updateTrue_Skill_MultiSelect_PopUpState()}>
                                                        <Text style={[styles.Lbl_ShareText, styles.Lbl_Align_Center]}>Add/Edit</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                            {this.state.DetailsUser_Array[0].job_seeker_skill.trim() != "" ? <View style={[styles.gridItem]}>
                                                <Text style={styles.Lbl_Grid}>Selected Skill: </Text>
                                                <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', }}>
                                                    <Text style={[styles.Lbl2_ShareText]}>{this.state.DetailsUser_Array[0].job_seeker_skill}</Text>
                                                </View>
                                            </View> : null}

                                            <View style={[styles.gridItem]}>
                                                <Text style={styles.Lbl_Grid}>Educational Qualification : </Text>
                                                <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', }}>
                                                    <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'center', width: 120, height: 35, margin: 5, borderRadius: 20, borderColor: '#2fa1f7', borderWidth: 1, backgroundColor: '#e3f4ff' }} onPress={() => this.updateTrue_EQualification_MultiSelect_PopUpState()}>
                                                        <Text style={[styles.Lbl_ShareText, styles.Lbl_Align_Center]}>Add/Edit</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                            {this.state.DetailsUser_Array[0].job_seeker_educational_qualification.trim() != "" ? <View style={[styles.gridItem]}>
                                                <Text style={styles.Lbl_Grid}>Selected Qualification: </Text>
                                                <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', }}>
                                                    <Text style={[styles.Lbl2_ShareText]}>{this.state.DetailsUser_Array[0].job_seeker_educational_qualification}</Text>
                                                </View>
                                            </View> : null}

                                        </View>

                                        <View style={styles.View_Box}>

                                            <View style={[styles.gridItem]} >
                                                <Text style={styles.Lbl_Grid}>Country: </Text>
                                                <TouchableOpacity style={styles.View_Box_TextField} onPress={() => this.updateTrue_CountryList_PopUpState()} >
                                                    <Text style={this.state.CountryName.trim() != "" ? [styles.Lbl_ShareText] : [styles.Lbl_ShareText, styles.Lbl_PlaceHolder_Color]}>
                                                        {this.state.CountryName.trim() != "" ? this.state.CountryName : 'Select Country'}
                                                    </Text>
                                                    <Image
                                                        source={require('../images/dropDImg.png')}
                                                        style={{ width: 25, height: 25, margin: 5, alignSelf: 'center' }}
                                                        resizeMode='stretch'
                                                    />
                                                </TouchableOpacity>
                                            </View>

                                            <View style={[styles.gridItem]}>
                                                <Text style={styles.Lbl_Grid}>State: </Text>
                                                <TouchableOpacity style={styles.View_Box_TextField} onPress={() => this.updateTrue_StateList_PopUpState()} >
                                                    <Text style={this.state.StateName.trim() != "" ? [styles.Lbl_ShareText] : [styles.Lbl_ShareText, styles.Lbl_PlaceHolder_Color]}>
                                                        {this.state.StateName.trim() != "" ? this.state.StateName : 'Select State'}
                                                    </Text>
                                                    <Image
                                                        source={require('../images/dropDImg.png')}
                                                        style={{ width: 25, height: 25, margin: 5, alignSelf: 'center' }}
                                                        resizeMode='stretch'
                                                    />
                                                </TouchableOpacity>
                                            </View>

                                            <View style={[styles.gridItem]}>
                                                <Text style={styles.Lbl_Grid}>City: </Text>
                                                <TouchableOpacity style={styles.View_Box_TextField} onPress={() => this.updateTrue_CityList_PopUpState()} >
                                                    <Text style={this.state.CityName.trim() != "" ? [styles.Lbl_ShareText] : [styles.Lbl_ShareText, styles.Lbl_PlaceHolder_Color]}>
                                                        {this.state.CityName.trim() != "" ? this.state.CityName : 'Select City'}
                                                    </Text>
                                                    <Image
                                                        source={require('../images/dropDImg.png')}
                                                        style={{ width: 25, height: 25, margin: 5, alignSelf: 'center' }}
                                                        resizeMode='stretch'
                                                    />
                                                </TouchableOpacity>
                                            </View>

                                            <View style={[styles.gridItem]} >
                                                <Text style={styles.Lbl_Grid}>Preferred work region: </Text>
                                                <TouchableOpacity style={styles.View_Box_TextField} onPress={() => this.updateTrue_PreWorkRegion_PopUpState()} >
                                                    <Text style={this.state.DetailsUser_Array[0].preferred_work_region.trim() != "" ? [styles.Lbl_ShareText] : [styles.Lbl_ShareText, styles.Lbl_PlaceHolder_Color]}>
                                                        {this.state.DetailsUser_Array[0].preferred_work_region.trim() != "" ? this.state.DetailsUser_Array[0].preferred_work_region : 'Select Work Region'}
                                                    </Text>
                                                    <Image
                                                        source={require('../images/dropDImg.png')}
                                                        style={{ width: 25, height: 25, margin: 5, alignSelf: 'center' }}
                                                        resizeMode='stretch'
                                                    />
                                                </TouchableOpacity>
                                            </View>

                                            <View style={[styles.gridItem]} >
                                                <Text style={styles.Lbl_Grid}>Distance from home: </Text>
                                                <TouchableOpacity style={styles.View_Box_TextField} onPress={() => this.updateTrue_DistanceFromHome_PopUpState()} >
                                                    <Text style={this.state.DetailsUser_Array[0].distance_from_home.trim() != "" ? [styles.Lbl_ShareText] : [styles.Lbl_ShareText, styles.Lbl_PlaceHolder_Color]}>
                                                        {this.state.DetailsUser_Array[0].distance_from_home.trim() != "" ? this.state.DetailsUser_Array[0].distance_from_home : 'Select Distance'}
                                                    </Text>
                                                    <Image
                                                        source={require('../images/dropDImg.png')}
                                                        style={{ width: 25, height: 25, margin: 5, alignSelf: 'center' }}
                                                        resizeMode='stretch'
                                                    />
                                                </TouchableOpacity>
                                            </View>

                                            <View style={[styles.gridItem]}>
                                                <Text style={styles.Lbl_Grid}>Additional Information: </Text>
                                                <View style={styles.View_Box_TextField}>
                                                    <TextInput
                                                        style={styles.TextBox_ShareText}
                                                        textAlignVertical="top"
                                                        multiline={true}
                                                        blurOnSubmit={true}
                                                        scrollEnabled={false}
                                                        placeholder="Enter Information"
                                                        placeholderTextColor='gray'
                                                        underlineColorAndroid='rgba(0,0,0,0)'
                                                        keyboardType='default'
                                                        returnKeyType='done'
                                                        autoCorrect={false}
                                                        onChangeText={text => {
                                                            const newArray = [...this.state.DetailsUser_Array];
                                                            newArray[0].job_seeker_additional_information = text;
                                                            this.setState({ DetailsUser_Array: newArray });
                                                        }}
                                                        value={this.state.DetailsUser_Array[0].job_seeker_additional_information}
                                                    />
                                                </View>
                                            </View>

                                            <View style={[styles.gridItem]}>
                                                <Text style={styles.Lbl_Grid}>Career objective: </Text>
                                                <View style={styles.View_Box_TextField}>
                                                    <TextInput
                                                        style={styles.TextBox_ShareText}
                                                        textAlignVertical="top"
                                                        multiline={true}
                                                        blurOnSubmit={true}
                                                        scrollEnabled={false}
                                                        placeholder="Enter objective"
                                                        placeholderTextColor='gray'
                                                        underlineColorAndroid='rgba(0,0,0,0)'
                                                        keyboardType='default'
                                                        returnKeyType='done'
                                                        autoCorrect={false}
                                                        onChangeText={text => {
                                                            const newArray = [...this.state.DetailsUser_Array];
                                                            newArray[0].job_seeker_carrier_objective = text;
                                                            this.setState({ DetailsUser_Array: newArray });
                                                        }}
                                                        value={this.state.DetailsUser_Array[0].job_seeker_carrier_objective}
                                                    />
                                                </View>
                                            </View>

                                        </View>

                                        <View style={{ flex: 1, justifyContent: 'center' }}>
                                            <AnimateLoadingButton
                                                ref={c => (this.loadingButton = c)}
                                                width={300}
                                                height={50}
                                                title="Save"
                                                titleFontFamily={'Acme-Regular'}
                                                titleFontSize={20}
                                                titleColor="rgb(255,255,255)"
                                                backgroundColor="#1c313b"
                                                borderRadius={25}
                                                onPress={() => this.SaveProfileData()}
                                            />
                                        </View>

                                        <View style={{ flex: 1, height: 10 }}></View>

                                    </ScrollView>

                                </KeyboardAvoidingView>
                                : null}
                        </View>
                    </View>



                    {this.state.isLoading ? <Loading /> : null}
                    {this.state.isPopUpOpen ?
                        <DropDown
                            updateParent={this.updatePopUpState.bind(this)}
                            newvalue={{
                                multiSelect: false,
                                key: this.state.DetailsUser_Array[0].job_seeker_industry_type,
                                arrayOfData: this.props.appdata.IndustryType_Array,
                            }}
                        />
                        : null}

                    {this.state.isGenderPopUpOpen ?
                        <DropDown
                            updateParent={this.update_Gender_PopUpState.bind(this)}
                            newvalue={{
                                multiSelect: false,
                                key: this.state.DetailsUser_Array[0].job_seeker_gender,
                                arrayOfData: this.props.appdata.Gender_Array,
                            }}
                        />
                        : null}

                    {this.state.isCountryCodePopUpOpen ?
                        <DropDown
                            updateParent={this.update_CountryCode_PopUpState.bind(this)}
                            newvalue={{
                                multiSelect: false,
                                key: this.state.DetailsUser_Array[0].job_seeker_mobile_code,
                                arrayOfData: this.state.CountryCode_Array,
                            }}
                        />
                        : null}        

                    {this.state.isJobTypePopUpOpen ?
                        <DropDown
                            updateParent={this.update_JobType_PopUpState.bind(this)}
                            newvalue={{
                                multiSelect: false,
                                key: this.state.DetailsUser_Array[0].job_seeker_job_type,
                                arrayOfData: this.props.appdata.JobType_Array,
                            }}
                        />
                        : null}

                    {this.state.isJobTimePopUpOpen ?

                        <DropDown
                            updateParent={this.update_JobTime_PopUpState.bind(this)}
                            newvalue={{
                                multiSelect: false,
                                key: this.state.DetailsUser_Array[0].job_seeker_job_type_time,
                                arrayOfData:
                                    this.state.DetailsUser_Array[0].job_seeker_job_type == "Seasonal" ?
                                        this.props.appdata.Job_Seasonal_Time_Array :
                                        this.props.appdata.JobTime_Array
                            }}
                        />
                        : null}

                    {this.state.isPreWorkRegionPopUpOpen ?

                        <DropDown
                            updateParent={this.update_PreWorkRegion_PopUpState.bind(this)}
                            newvalue={{
                                multiSelect: false,
                                key: this.state.DetailsUser_Array[0].preferred_work_region,
                                arrayOfData: this.props.appdata.PreferredWorkRegion_Array,
                            }}
                        />
                        : null}


                    {this.state.isDistanceFromHomePopUpOpen ?

                        <DropDown
                            updateParent={this.update_DistanceFromHome_PopUpState.bind(this)}
                            newvalue={{
                                multiSelect: false,
                                key: this.state.DetailsUser_Array[0].distance_from_home,
                                arrayOfData: this.props.appdata.DistanceFromHome_Array,
                            }}
                        />
                        : null}

                    {this.state.isCountryListPopUpOpen ?

                        <DropDown
                            updateParent={this.update_CountryList_PopUpState.bind(this)}
                            newvalue={{
                                multiSelect: false,
                                key: this.state.CountryName,
                                arrayOfData: this.state.CountryList_Array,
                            }}
                        />
                        : null}

                    {this.state.isStateListPopUpOpen ?

                        <DropDown
                            updateParent={this.update_StateList_PopUpState.bind(this)}
                            newvalue={{
                                multiSelect: false,
                                key: this.state.StateName,
                                arrayOfData: this.state.StateList_Array,
                            }}
                        />
                        : null}

                    {this.state.isCitiesListPopUpOpen ?

                        <DropDown
                            updateParent={this.update_CityList_PopUpState.bind(this)}
                            newvalue={{
                                multiSelect: false,
                                key: this.state.CityName,
                                arrayOfData: this.state.CitiesList_Array,
                            }}
                        />
                        : null}

                    {this.state.isMultiSelectPopUpOpen ?
                        <DropDown
                            updateParent={this.update_MultiSelect_PopUpState.bind(this)}
                            newvalue={{
                                multiSelect: true,
                                key: this.state.DetailsUser_Array[0].job_seeker_jt_restaurant_cat,
                                arrayOfData: this.state.DetailsUser_Array[0].job_seeker_industry_type == "Restaurant" ?
                                    this.state.RestaurantCategory_Array :
                                    this.state.DetailsUser_Array[0].job_seeker_industry_type == "Trades & Assistance" ?
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
                                key: this.state.DetailsUser_Array[0].job_seeker_type_of_food_served,
                                arrayOfData: this.state.FoodsServed_Array,
                            }}
                        />
                        : null}

                    {this.state.isLanguageKnownSpeakMultiSelectPopUpOpen ?
                        <DropDown
                            updateParent={this.update_LanguageKnownSpeak_MultiSelect_PopUpState.bind(this)}
                            newvalue={{
                                multiSelect: true,
                                key: this.state.DetailsUser_Array[0].job_seeker_language_known_speak,
                                arrayOfData: this.state.LKnownSpeak_Array,
                            }}
                        />
                        : null}

                    {this.state.isLanguageKnownWriteMultiSelectPopUpOpen ?
                        <DropDown
                            updateParent={this.update_LanguageKnownWrite_MultiSelect_PopUpState.bind(this)}
                            newvalue={{
                                multiSelect: true,
                                key: this.state.DetailsUser_Array[0].job_seeker_language_known_write,
                                arrayOfData: this.state.LKnownWrite_Array,
                            }}
                        />
                        : null}
                    {this.state.isSkillMultiSelectPopUpOpen ?
                        <DropDown
                            updateParent={this.update_Skill_MultiSelect_PopUpState.bind(this)}
                            newvalue={{
                                multiSelect: true,
                                key: this.state.DetailsUser_Array[0].job_seeker_skill,
                                arrayOfData: this.state.Skill_Array,
                            }}
                        />
                        : null}
                    {this.state.isEQualificationMultiSelectPopUpOpen ?
                        <DropDown
                            updateParent={this.update_EQualification_MultiSelect_PopUpState.bind(this)}
                            newvalue={{
                                multiSelect: true,
                                key: this.state.DetailsUser_Array[0].job_seeker_educational_qualification,
                                arrayOfData: this.state.EDQualification_Array,
                            }}
                        />
                        : null}

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
        updateUserImage: (payload) => dispatch({
            type: 'USER_IMAGE_UPDATE',
            payload: payload,
        }),
        updateUserDetilas: (payload) => dispatch({
            type: 'USER_UPDATE',
            payload: payload,
        }),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        alignItems: 'stretch',
        marginTop: 0,
        marginBottom: 2,
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
        //maxWidth: 120,
        width: '26%',
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

    TextInput_ShareText: {
        flex: 1,
        //margin: 5,
        padding: 5,
        fontSize: 18,
        color: '#1c313b',
        textAlign: 'left',
        alignSelf: 'center',
        fontFamily: 'Acme-Regular',
        height: 40,
        //backgroundColor: 'red',
    },

    TextMultilineInput_ShareText: {
        flex: 1,
        //margin: 5,
        padding: 5,
        fontSize: 18,
        color: '#1c313b',
        textAlign: 'left',
        alignSelf: 'center',
        fontFamily: 'Acme-Regular',
        // height: 40,
        //backgroundColor: 'red',
    },

    Lbl_PlaceHolder_Color: {
        color: 'gray',
    },

    TextBox_ShareText: {
        flex: 1,
        margin: 5,
        height: 80,
        fontSize: 18,
        color: '#1c313b',
        textAlign: 'left',
        fontFamily: 'Acme-Regular',
        //backgroundColor: 'red',
    },

    View_lineBlue: { height: 1, width: '100%', backgroundColor: '#2fa1f7' },
    View_Box_TextField: { flex: 1, flexDirection: 'row', margin: 10, borderColor: '#2fa1f7', borderWidth: 1, backgroundColor: '#e3f4ff', },
    View_MobileBox_TextField: { flexDirection: 'row', justifyContent: 'center', margin: 10, marginRight: 5, borderColor: '#2fa1f7', borderWidth: 1, backgroundColor: '#e3f4ff', width: 75 },

    View_Camera_BG: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderColor: '#2fa1f7',
        borderWidth: 1,
    },

    View_Circle_BG: {
        backgroundColor: '#f7990c',
        width: 90,
        borderRadius: 45,
        borderColor: 'white',
        borderWidth: 5,
        overflow: 'hidden',

    },

    View_Shadow_Circle_BG: {
        flex: 1,
        borderRadius: 45,
        elevation: 4,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "gray",//"#2fa1f7",
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },

    Lbl_Align_Center: {
        textAlign: 'center',
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

    View_ButtonText: {
        alignSelf: 'center',
        width: 300,
        height: 50,
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

});