import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../utils/AppConfig';
import LinearGradient from 'react-native-linear-gradient';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    tabs: {
        // flex: 1,
        // height: 50,
        // paddingHorizontal: 12,
        backgroundColor: Colors.whisper,
        flexDirection: 'row',
        justifyContent: 'space-around',
        overflow: 'hidden',
        // padding: 12,
    },
    activeTab: {
        // margin:1
        margin: 12,
        paddingVertical: 12,
        // paddingHorizontal: 12,
        borderRadius: 6,
        // borderBottomWidth: 5,
        // borderWidth: 2,
        // borderBottomColor: Colors.purple_blue,
        backgroundColor: Colors.purple_blue,
        // boder: 5,
    },

    inactiveTab: {
        // paddingVertical: 12,
        // borderRadius: 14,
        // borderBottomWidth: 5,
        // borderWidth: 2,
        // borderBottomColor: Colors.purple_blue,
        // backgroundColor: Colors.whisper,
        // backgroundColor: ,
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width / 2,
    },
});

export default function CustomTab(props) {
    // console.log(props);
    let { tabs, goToPage, activeTab } = props;
    return (
        <View style={styles.tabs}>
            {tabs.map((tab, index) => (
                <TouchableOpacity
                    activeOpacity={false}
                    key={tab}
                    onPress={() => goToPage(index)}
                    style={[
                        styles.tab,
                        activeTab === index ? styles.activeTab : styles.inactiveTab,
                    ]}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: activeTab === index ? 'bold' : '600',
                            color: activeTab === index ? Colors.white : Colors.grey,
                        }}
                    >
                        {tab}
                    </Text>
                </TouchableOpacity>
            ))}
            {/*</View>*/}
        </View>
    );
}
