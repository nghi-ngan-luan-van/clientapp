import React from 'react';
import {Platform, StyleSheet, TouchableHighlight, View} from 'react-native';
import {Colors} from "../../utils/AppConfig";

class FlaggedPoint extends React.Component {
    render() {
        const {
            enabled,
            markerStyle,
            pressed,
            pressedMarkerStyle,
            disabledMarkerStyle,
            total = 100,
            end = 0,
            start = 0,
            sliderLength=100,
        } = this.props;
        const duration = end > start ? end - start : 1;
        return (
            <View
                style={[
                    styles.point,
                    {
                        width: duration,
                        left: Number((start / total) * sliderLength - sliderLength)||0,
                    }
                ]}
            />
        );
    }
}

export default class FlaggedPoints extends React.Component {
    render() {
        const {
            list = [],
            sliderLength
        } = this.props;
        if (Array.isArray(list) && list.length > 0)
            return (
                <View style={{
                    flex: 1,
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    // position: 'absolute',

                }}>

                    {
                        list.map((item, index) =>
                            <FlaggedPoint
                                key={'flag_' + index}
                                start={item.start}
                                end={item.end}
                                sliderLength={sliderLength}
                            />
                        )
                    }

                </View>
            )
        else
            return null;


    }
}

const styles = StyleSheet.create({
    point: {
        position: 'absolute',
        backgroundColor: Colors.light_purple_blue,
        height: 20,
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


