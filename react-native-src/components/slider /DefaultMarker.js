import React from 'react';
import {
    View, StyleSheet, Platform, TouchableHighlight
} from 'react-native';

class DefaultMarker extends React.Component {
    render() {
        const {
            enabled,
            markerStyle,
            pressed,
            pressedMarkerStyle,
            disabledMarkerStyle
        } = this.props;
        return (
            <TouchableHighlight>
                <>
                <View
                    style={
                        enabled
                            ? [
                                styles.markerStyle,
                                markerStyle,
                                pressed && styles.pressedMarkerStyle,
                                pressed && pressedMarkerStyle,
                            ]
                            : [
                                styles.markerStyle,
                                styles.disabled,
                                disabledMarkerStyle,
                            ]
                    }
                />
                <View style={[styles.markerStyle,{ alignSelf:'center',height:26,width:3, backgroundColor:'red'}]}/>
            </>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    markerStyle: {
        height: 15,
        width: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 1,
        shadowOpacity: 0.2,
        elevation: 3
    },
    pressedMarkerStyle: {
        ...Platform.select({
            web: {},
            ios: {},
            android: {
                height: 20,
                width: 20,
                borderRadius: 20,
            },
        }),
    },
    disabled: {
        backgroundColor: '#d3d3d3',
    },
});

export default DefaultMarker;
