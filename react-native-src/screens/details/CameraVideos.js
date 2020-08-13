import React, { Component } from 'react';
import CalendarPicker from '../../components/CalendarPicker';
import { getMovingEvents, getBackupVideo } from '../../utils/ApiUtils';
import AsyncStorage from '@react-native-community/async-storage';
import CustomVideoView from './CustomVideoView';
import Orientation from 'react-native-orientation';
import moment from 'moment';
import {
    ActivityIndicator,
    Text,
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Colors } from '../../utils/AppConfig';
import VLCPlayer from 'react-native-vlc-media-player/VLCPlayer';
import { VlCPlayerView } from 'react-native-vlc-media-player';
import { Icon } from 'react-native-elements';
import Slider from '../../components/slider/Slider';
import { AuthContext } from '../../navigation/context';
import LinearGradient from 'react-native-linear-gradient';
import VLCPlayerView from '../../components/VLCPlayer/VLCPlayerView';
import Loader from '../../components/Loader';
import VLCVideoMp4 from '../../components/VLCPlayer/VLCVideoMp4';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    title: { fontSize: 20, fontWeight: 'bold', marginVertical: 12, color: Colors.purple_blue },
    container: { flex: 1, paddingHorizontal: 12 },
    eContainer: {
        flex: 1,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        opacity: 0.9,
    },
    text: {
        textAlign: 'center',
        color: Colors.arapawa,
        fontSize: 20,
    },
    calendar: {
        // flex: 1,
        width: 35,
        resizeMode: 'contain',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    calendarRow: {
        height: 40,
        alignItems: 'center',
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
    },
});

class CameraVideosComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCalendar: true,
            loading: true,
            eventList: [],
            backupList: [],
            currentDay: '',
            items: [],
        };
    }

    componentDidMount = async () => {
        let camera =
            this.props.camera || (this.props.route.params && this.props.route.params.camera);
        let date = new Date();
        const currentDay = this.timeToString();
        //console.log('currentDay', currentDay);
        this.setState({ currentDay });
        await this.loadData(camera);
    };

    componentWillUnmount() {}

    loadData = async camera => {
        const { signOut } = this.props;

        let userToken = await AsyncStorage.getItem('userToken');

        await getMovingEvents({ userToken, camera }, respond => {
            if (Array.isArray(respond)) {
                this.setState({ eventList: respond }, () => this.setState({ loading: false }));
            } else {
                typeof signOut === 'function' && signOut();
            }
        });

        await getBackupVideo({ userToken, camera }, respond => {
            if (Array.isArray(respond)) {
                this.setState({ backupList: respond });
            }
        });
    };

    onCalendarPress = () => {
        const { showCalendar } = this.state;
        this.setState({ showCalendar: !showCalendar });
    };

    timeToString = time => {
        let dateStr = time ? new Date(time) : new Date();
        const date = dateStr.getDate() < 10 ? `0${dateStr.getDate()}` : dateStr.getDate();
        const month = dateStr.getMonth() < 10 ? `0${dateStr.getMonth() + 1}` : dateStr.getMonth();
        const year = dateStr.getFullYear();
        return year + '-' + month + '-' + date;
        // return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    };

    getDate = day => {
        const { dateString } = day;
        this.setState({ currentDay: dateString });
        //console.log('dateString', day);
    };
    getItems = items => {
        //console.log('get', items);
        const newItems = Array.isArray(items) && items.filter(item => item.cdnUrl !== null);
        this.setState({ items: newItems });
        //const
    };
    onEnd = () => {};
    renderVideo = () => {
        let { items } = this.state;

        console.log('items', items);
        if (items && items[0]) {
            let { cdnUrl } = items[0] || {};
            return (
                <VLCVideoMp4 url={cdnUrl} style={{ width: width, height: 300 }} />
                //
                // <View>
                //     <VLCPlayerView url={cdnUrl} style={{ width: width, height: 300 }} />
                // </View>
            );
        } else {
            return null;
        }
    };
    renderCalendar = () => {
        const { showCalendar, eventList, backupList } = this.state;
        if (showCalendar) {
            return (
                <CalendarPicker
                    {...this.props}
                    backupList={backupList}
                    // setBackupList={this.setBackupList}
                    data={eventList}
                    getDate={day => this.getDate(day)}
                    getItems={items => this.getItems(items)}
                />
            );
        } else {
            return null;
        }
    };

    renderLoading() {
        return <Loader color={Colors.white} />;
    }

    renderEmpty() {
        return (
            <View style={styles.eContainer}>
                <Text style={styles.text}>
                    Hiện tại hệ thống chưa tìm thấy dữ liệu của camera này. Quay lại sau bạn nhé!
                </Text>
                <Image
                    source={require('../../assets/emptyLib.gif')}
                    style={{ width: 300, height: 300, alignSelf: 'center', resizeMode: 'contain' }}
                />
            </View>
        );
    }

    renderMainContent() {
        const { showCalendar, currentDay } = this.state;
        return (
            <LinearGradient
                style={styles.container}
                colors={[Colors.white, Colors.screen]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
            >
                {this.renderVideo()}
                <Text style={styles.title}>Xem video theo ngày:</Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    // activeOpacity={false}
                    style={styles.calendarRow}
                    onPress={this.onCalendarPress}
                >
                    <Text>{String(currentDay)}</Text>
                    <Icon
                        name={'calendar'}
                        type={'antdesign'}
                        color={Colors.purple_blue}
                        activeOpacity={false}
                    />
                    <Icon
                        name={showCalendar ? 'down' : 'up'}
                        type={'antdesign'}
                        color={Colors.violet}
                    />
                    {/*<Image*/}
                    {/*    source={require('../../assets/ic_calendar.png')}*/}
                    {/*    style={styles.calendar}*/}
                    {/*/>*/}
                </TouchableOpacity>
                {this.renderCalendar()}
            </LinearGradient>
        );
    }
    render() {
        if (this.state.loading) {
            return this.renderLoading();
        } else {
            const { eventList, backupList } = this.state;

            if (eventList.length == 0 && backupList.length == 0) {
                return this.renderEmpty();
            } else {
                return this.renderMainContent();
            }
        }
    }
}

export default function CameraVideos(props) {
    const { signOut } = React.useContext(AuthContext);
    return <CameraVideosComp {...props} signOut={signOut} />;
}
