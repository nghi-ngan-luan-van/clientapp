import React from 'react';
import { SafeAreaView, FlatList, StyleSheet, Dimensions } from 'react-native';
import Item from './components/Item/Item';
// import { isAndroid, ScreenHeight, ScreenWidth } from '@freakycoder/react-native-helpers';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    listStyle: {
        width: width,
        // maxHeight: isAndroid ? ScreenHeight / 2 - 32 : null,
    },
    contentContainerStyle: {
        alignItems: 'center',
        paddingTop: 24,
    },
});
const Timeline = props => {
    const { data, backgroundColor } = props;

    const renderItem = ({ item, index }) => {
        const isLastMember = index === data.length - 1;
        return <Item item={item} isLastMember={isLastMember} />;
    };

    return (
        <FlatList
            data={data}
            style={styles.listStyle}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.contentContainerStyle}
        />
    );
};

export default Timeline;
