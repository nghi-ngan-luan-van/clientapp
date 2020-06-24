import React from 'react';
import Dash from 'react-native-dash';
import moment from 'moment';
import { Image, Text, View, StyleSheet } from 'react-native';

const PointLine = props => {
    const { title, data, length } = props;
    return (
        <View style={styles.container}>
            <View style={styles.containerGlue}>
                <Text>{String(title) + ':00' || '00:00'}</Text>
                <Text>{moment(data).format('ddd').toUpperCase() || 'TUE'}</Text>
            </View>
            <View style={styles.dividerStyle}>
                <Image
                    style={{
                        marginTop: -12,
                        marginLeft: -10,
                        borderRadius: 10,
                        backgroundColor: '#140b72',
                        height: 20,
                        width: 20,
                        resizeMode: 'contain',
                    }}
                    source={require('./ic_motion_sensor.png')}
                />
                {/*{!isLastMember && (*/}
                <Dash
                    dashGap={7}
                    dashColor="#e3e3e3"
                    style={[styles.dashStyle, { height: 100 * length }]}
                />
                {/*)}*/}
            </View>
        </View>
    );
};

PointLine.defaultProps = {
    dayFontColor: '#984cf8',
    monthFontColor: '#ded9e6',
};
export const _monthTextStyle = (color, fontFamily) => ({
    color,
    fontFamily,
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginLeft: 24,
    },
    containerGlue: {
        marginTop: -7,
        marginRight: 12,
        alignItems: 'center',
        flexDirection: 'column',
    },
    dividerStyle: {
        paddingTop: 12,
        marginLeft: 12,
    },
    dashStyle: {
        width: 1,
        flexDirection: 'column',
    },
});

export default PointLine;
