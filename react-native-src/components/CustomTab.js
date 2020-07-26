import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../utils/AppConfig';
import LinearGradient from 'react-native-linear-gradient';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    tabs: {
        // flex: 1,
        height: 70,
        backgroundColor: Colors.whisper,
        flexDirection: 'row',
        justifyContent: 'space-around',
        overflow: 'hidden',
        // padding: 12,
    },
    activeTab: {
        margin: 10,
        borderRadius: 14,
        backgroundColor: Colors.white,
    },

    inactiveTab: {
        backgroundColor: 'transparent',
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
        <LinearGradient
            colors={[Colors.brandy_rose, Colors.pigeon_post, Colors.purple_blue]}
            style={styles.tabs}
            // style={[styles.container, { paddingTop: insets.top }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            {/*<View style={styles.tabs}>*/}
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
                            fontWeight: activeTab === index ? 'bold' : '400',
                            color: activeTab === index ? Colors.violet : Colors.arapawa,
                        }}
                    >
                        {tab}
                    </Text>
                </TouchableOpacity>
            ))}
            {/*</View>*/}
        </LinearGradient>
    );
}
