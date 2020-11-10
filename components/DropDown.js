import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    Modal,
} from 'react-native';

export default class dropDownPage extends React.Component {

    state = {
        arrayDDown: []
    }

    constructor(props) {
        super(props);
    }


    selectItem = (data) => {

        const index = this.state.arrayDDown.findIndex(
            item => data.clas_nam === item.clas_nam
        );

        if (this.props.newvalue.multiSelect == false) {
            let newTripRequest = this.state.arrayDDown.map((person, indx) => {
                //console.log("person ===>>", person, "index ===>>", indx)
                return { ...person, isSelect: index == indx ? true : false };
            })

            this.setState({
                arrayDDown: newTripRequest
            });
        } else {
            let newTripRequest = this.state.arrayDDown.map((person, indx) => {
                //console.log("person ===>>", person, "index ===>>", indx)
                if (index == indx) {
                    return { ...person, isSelect: person.isSelect == false ? true : false };
                }
                return person;
            })

            this.setState({
                arrayDDown: newTripRequest
            });
        }

    }

    updateItem = (dataText, totalArray) => {

        if (this.props.newvalue.multiSelect == false) {
            if (dataText == '') {
                this.setState({
                    arrayDDown: totalArray
                });
            } else {
                let newTripRequest = totalArray.map((person, indx) => {
                    //console.log("person ===>>", person, "index ===>>", indx)
                    return { ...person, isSelect: person.clas_nam == dataText ? true: false };
                })

                this.setState({
                    arrayDDown: newTripRequest
                });
            }
        } else {
            // console.log("Array Of Data ===>>>> ", JSON.stringify(dataText))
            // console.log("totalArray Array Of Data ===>>>> ", JSON.stringify(totalArray))

            if (dataText == '') {
                for (j = 0; j < totalArray.length; j++) {
                    totalArray[j].isSelect = false
                }

                this.setState({
                    arrayDDown: totalArray
                });
            } else {

                for (j = 0; j < totalArray.length; j++) {
                    totalArray[j].isSelect = false
                }

                var Array_Obj = dataText.split(",");
                for (i = 0; i < Array_Obj.length; i++) {
                    for (j = 0; j < totalArray.length; j++) {
                        if (totalArray[j].clas_nam.trim() == Array_Obj[i].trim()){
                            totalArray[j].isSelect = true
                            break
                        } 
                    }
                }
                // console.log("Total Array Of Data ===>>>> ", JSON.stringify(totalArray))

                
                this.setState({
                    arrayDDown: totalArray
                });
            }
        }
    }

    Button_Press_Done = () => {
        const result = this.state.arrayDDown.filter(word => word.isSelect == true);

        if (this.props.newvalue.multiSelect == false) {
            this.props.updateParent({ roleText: result[0].clas_nam });
        } else {
            var str = '';
            for (var i = 0, len = result.length; i < len; i++) {
                if (i == len - 1) {
                    str += result[i].clas_nam
                } else {
                    str += result[i].clas_nam + ', '
                }
            }
            this.props.updateParent({ roleText: str });
        }
    }
    Button_Press_Cancel = () => {
        this.props.updateParent({ roleText: '' });
    }

    componentDidMount() {
        this.updateItem(this.props.newvalue.key, this.props.newvalue.arrayOfData)
    }

    render() {
        //console.log("DDown props ===>>>> ", JSON.stringify(this.state))
        return (
            <Modal transparent={true}>
                <View style={styles.View_dropDown}>
                    <View style={{ flex: 1, left: 5 + '%', maxWidth: 90 + '%', maxHeight: 80 + '%', justifyContent: 'flex-start', borderRadius: 10, backgroundColor: '#ffffff' }}>
                        <View style={{ flex: 1, marginTop: 20 }}>
                            <Text style={[styles.buttonText, styles.View_color3]}>
                                {this.props.newvalue.multiSelect == false ? 'Choose an option.' : 'Select any option.'}
                            </Text>
                            <View style={{ marginTop: 20, width: '100%', height: 1, backgroundColor: '#dadee3' }}></View>
                            <View style={{ marginTop: 5, flex: 1 }}>
                                <FlatList
                                    data={this.state.arrayDDown}
                                    renderItem={({ item }) =>
                                        <TouchableOpacity style={styles.View_Cell} onPress={() => this.selectItem(item)}>
                                            {item.isSelect ?
                                                <Image
                                                    source={this.props.newvalue.multiSelect ? require('../images/checkbox_selected.png') : require('../images/radio_select.png')}
                                                    style={{ width: 35, height: 35, backgroundColor: '#ffffff', alignSelf: 'center' }}
                                                    resizeMode='stretch'
                                                /> : <Image
                                                    source={this.props.newvalue.multiSelect ? require('../images/checkbox_normal.png') : require('../images/radio_deselect.png')}
                                                    style={{ width: 35, height: 35, backgroundColor: '#ffffff', alignSelf: 'center' }}
                                                    resizeMode='stretch'
                                                />}
                                            <Text style={styles.Lbl_CellText}>{item.clas_nam}</Text>
                                        </TouchableOpacity>
                                    }
                                />
                            </View>

                            <View style={{
                                height: 60,
                                //alignItems: 'center',
                                flexDirection: 'row',
                                //flex: 1,
                                //backgroundColor: 'yellow',
                                //justifyContent: 'center',
                                width: 100 + '%',
                                marginTop: 10,
                                marginBottom: 10,
                            }}>
                                <View style={{ height: 100 + '%', width: 50 + '%', justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        style={[styles.View_ButtonText, styles.View_color1]}
                                        onPress={() => { this.Button_Press_Cancel() }}
                                    >
                                        <Text style={styles.buttonText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ height: 100 + '%', width: 50 + '%' }}>
                                    <TouchableOpacity
                                        style={[styles.View_ButtonText, styles.View_color2]}
                                        //onPress= {this.props.updateParent} 
                                        onPress={() => { this.Button_Press_Done() }}
                                    >
                                        <Text style={styles.buttonText}>Done</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>


                        </View>

                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    View_dropDown: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        //width: 200,
        //height: 200,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: '#ffffff',
        //fontWeight: '500',
        textAlign: 'center',
        fontFamily: 'Acme-Regular',
    },
    View_ButtonText: {
        width: 90 + '%',
        height: 55,
        //backgroundColor: '#1c313b',
        borderRadius: 25,
        //paddingHorizontal: 20,
        //marginVertical: 10,
        justifyContent: "center",
    },

    View_color1: {
        backgroundColor: '#f0223a',
    },
    View_color2: {
        backgroundColor: '#07a316',
    },
    View_color3: {
        color: '#1c313b',
    },

    View_Cell: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

    Lbl_CellText: {
        marginHorizontal: 10,
        fontSize: 20,
        color: '#1c313b',
        //fontWeight: '500',
        textAlign: 'left',
        fontFamily: 'Acme-Regular',
    },
});