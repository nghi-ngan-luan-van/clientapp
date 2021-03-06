import React, { useEffect } from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';
import { Colors } from '../utils/AppConfig';
import { backgroundColor } from 'react-native-calendars/src/style';
const Loader = props => {
    const { loading, transparent, color, ...attributes } = props;
    // con
    console.log('loading', loading);
    // useEffect(()=>{
    //     return setLoading(false)
    // })
    return (
        <Modal
            fullScreen
            transparent={true}
            // animationType={'none'}
            visible={loading}
            onRequestClose={() => {
                console.log('close modal');
            }}
        >
            <View style={styles.modalBackground}>
                <View style={[styles.activityIndicatorWrapper, { backgroundColor: color }]}>
                    {/*<Text>Loading...</Text>*/}
                    <ActivityIndicator
                        animating={loading}
                        color={Colors.purple_blue}
                        size={'large'}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#00000040',
        // height: 300,
    },
    activityIndicatorWrapper: {
        // height: 300,
        // flex: 1,
        // marginTop: 200,
        backgroundColor: Colors.screen,
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.9,
    },
});

export default Loader;
