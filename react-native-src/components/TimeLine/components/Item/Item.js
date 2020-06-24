import React from 'react';
import moment from 'moment';
import { View, FlatList, Dimensions, StyleSheet, TouchableOpacity, Text } from 'react-native';
import PointLine from '../PointLine/PointLine';
const { width, height } = Dimensions.get('window');

const dummyListData = [1, 2];
const styles = StyleSheet.create({
    container: {
        width,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    insideListContainer: {
        marginTop: -24,
        flexDirection: 'column',
    },
});

const Item = props => {
    const { item, list, isLastMember } = props;
    const { data, hour } = item || {};
    // const { data } = data || {};
    const getTimeString = duration => {};
    const renderItem = listItem => {
        let { item = {}, index } = listItem;
        return (
            <TouchableOpacity style={{ height: 70, borderWidth: 0.3, marginBottom: 10 }}>
                <Text>{moment(item.timeStart).format('DD ddd, HH:mm')}</Text>
                <Text>{String(item.duration)}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <PointLine title={hour} length={data.length} isLastMember={isLastMember} />
            <View style={styles.insideListContainer}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    );
};

Item.defaultProps = {
    data: {},
    list: dummyListData,
};

export default Item;
