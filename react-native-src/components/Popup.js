import React from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';
import { Colors } from '../utils/AppConfig';
const Popup = props => {
    const { loading, children } = props;
    console.log('loading', loading);
    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={loading}
            onRequestClose={() => {
                console.log('close modal');
            }}
        >
            <View style={styles.modalBackground}>{children}</View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
    },
    activityIndicatorWrapper: {
        backgroundColor: Colors.screen,
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        opacity: 0.9,
    },
});

export default Popup;
