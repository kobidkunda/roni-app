import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import { isIphoneX } from 'react-native-iphone-x-helper';


export default class BottomViewPage extends React.Component {
    render() {
        return (
            <View style={styles.mainView} >
                <Text style={styles.textStyle}>© 2018 ijob.shops. All rights reserved</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        width: '100%',
        // height: 40,
        height: Platform.OS === 'ios' && isIphoneX()? 60 : 40,
        paddingBottom: Platform.OS === 'ios' && isIphoneX()? 20 : 0,
        backgroundColor: '#2fa1f7',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
    textStyle: {
        color: '#fff',
        fontSize: 12
    },
});