import {
    Dimensions,
    Image,
    SafeAreaViewComponent,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import _ from 'lodash';
import { Colors } from '../utils/AppConfig';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 100;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: HEADER_HEIGHT,
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-between',
        // padding: 12,
    },
    backgroundImg: {
        position: 'absolute',
        top: -40,
        right: 0,
        width: width,
        height: HEADER_HEIGHT,
        resizeMode: 'cover',
        // backgroundColor:''
        backgroundColor: '#fff',
    },
    title: {
        color: Colors.text,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

//22215B
export default Header = props => {
    const { options = {}, scene, titleMode } = props;
    const title =
        options.headerTitle !== undefined
            ? options.headerTitle
            : options.title !== undefined
            ? options.title
            : scene.route.name;

    const onPressLeft = () => {
        const { onPressLeft } = props;
        if (typeof onPressLeft === 'function') {
            onPressLeft();
        } else {
            const { navigation } = props;
            navigation && navigation.goBack();
        }
    };
    const renderHeaderLeft = () => (
        <TouchableOpacity onPress={onPressLeft}>
            <Image
                resizeMode="contain"
                style={{ width: 18, height: 18 }}
                source={require('../assets/ic_back.png')}
            />
        </TouchableOpacity>
    );

    const renderHeaderRight = () => {
        const headerRight = _.get(props, 'scene.descriptor.options.headerRight', <View />);
        if (!headerRight) {
            return <View />;
        }
        return headerRight;
    };
    const renderTitle = () => {
        if (titleMode === 'none') {
            return <View />;
        } else {
            return <Text style={styles.title}>{title}</Text>;
        }
    };

    return (
        <View style={styles.container}>
            {renderHeaderLeft()}
            {renderTitle()}
            {renderHeaderRight()}
        </View>
    );
};
