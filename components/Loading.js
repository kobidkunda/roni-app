import React from 'react';
import {
    StyleSheet,
    View,
    //ActivityIndicator,
    Modal,
} from 'react-native';

import {
    BallIndicator,
    //BarIndicator,
    //DotIndicator,
    //MaterialIndicator,
    //PacmanIndicator,
    //PulseIndicator,
    //SkypeIndicator,
    //UIActivityIndicator,
    //WaveIndicator,
} from 'react-native-indicators';

export default class LoadingPage extends React.Component {

    render() {
        return (
            <Modal transparent={true}>
                <View style={styles.View_1dropDown}>
                    <BallIndicator color='white' />
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    View_1dropDown: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        //width: 200,
        //height: 200,
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
        justifyContent: 'center',
    },
});