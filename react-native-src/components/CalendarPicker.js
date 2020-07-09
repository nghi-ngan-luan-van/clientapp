import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import AgendaView from 'react-native-calendars/src/agenda';
import moment from 'moment';
import { AppRoute } from '../navigation/app-routes';
import VideoPlayer from './VLCPlayer/VideoPlayer';
import { VLCPlayer } from 'react-native-vlc-media-player';

export default class CalendarPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: {},
            data: this.props.data,
            recordVideos: this.props.backupList,
        };
        this.newData = {};
        this.newBackupList = {};
        this.markedDates = {
            // '2017-05-08': { textColor: '#43515c' },
            // '2017-05-09': { textColor: '#43515c' },
            // '2017-05-14': { startingDay: true, endingDay: true, color: 'pink' },
            // '2017-05-21': { startingDay: true, color: 'blue' },
            // '2017-05-22': { endingDay: true, color: 'gray' },
            // '2017-05-24': { startingDay: true, color: 'gray' },
            // '2017-05-25': { color: 'gray' },
            // '2020-07-02': { startingDay: true, endingDay: true, color: 'pink' },
        };
        // this.loadItems = this.props.data;
    }
    componentDidMount = () => {};

    groupTime = () => {
        this.state.data.forEach((value, index, arr) => {
            const date = moment(Number(value.timeStart)).startOf('day');
            const strDate = this.timeToString(date);
            if (!this.newData[strDate]) {
                this.newData[strDate] = [];
            }
            this.newData[strDate].push(value);
        });
    };
    groupBackupListTime = () => {
        console.log(this.props);
        let { recordVideos = [] } = this.state;
        recordVideos.forEach((value, index, arr) => {
            const date = moment(Number(value.timeStart)).startOf('day');
            const strDate = this.timeToString(date);
            if (!this.newBackupList[strDate]) {
                this.newBackupList[strDate] = [];
            }
            this.newBackupList[strDate].push(value);
        });
    };
    loadItems = day => {
        setTimeout(() => {
            const time = day.timestamp;
            const strTime = this.timeToString(time);
            console.log('time', time, 'strTime', strTime);
            this.newData = {};
            this.newBackupList = {};
            this.groupTime();
            this.groupBackupListTime();
            if (!this.newData[strTime]) {
                this.newData[strTime] = [];
            }
            if (!this.newBackupList[strTime]) {
                this.newBackupList[strTime] = [];
            }
            console.log('this.newData', this.newData);
            console.log('this.newbackupList ', this.newBackupList);
            this.props.setBackupList(this.newBackupList[strTime]);
            let newItems = this.state.items;
            newItems[strTime] = this.newData[strTime];
            this.setState({ items: newItems });
        }, 1000);
    };

    renderVideoByItem = item => {
        let { navigation } = this.props;
        console.log('renderVideoByItem', this.props);
        navigation && navigation.navigate(AppRoute.VIDEO_PLAYER_SCREEN, { video: item });
    };
    renderItem = item => {
        // console.log('item', item);
        const d = new Date(parseInt(item.timeStart));
        const n = d.toLocaleTimeString();
        // console.log('n', n);
        return (
            <TouchableOpacity
                testID={'ITEM'}
                style={[styles.item, { height: 50 }]}
                onPress={() => (item.filePath ? this.renderVideoByItem(item) : {})}
            >
                <Text>
                    {item.filePath ? `Video: ${item.filePath} ⏰ ${n} ` : `Chuyển động lúc ${n}`}
                </Text>
            </TouchableOpacity>
        );
    };

    renderEmptyDate = () => {
        return (
            <View style={styles.emptyDate}>
                <Text>Không có video !</Text>
            </View>
        );
    };

    rowHasChanged = (r1, r2) => {
        return r1.name !== r2.name;
    };

    timeToString = time => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    };
    render() {
        return (
            <AgendaView
                testID={'CONTAINER'}
                items={this.state.items}
                loadItemsForMonth={this.loadItems}
                onDayPress={day => {
                    console.log('day pressed');
                }}
                // callback that gets called when day changes while scrolling agenda list
                onDayChange={day => {
                    console.log('day changed');
                }}
                // selected={'2020-06-10'}
                renderItem={this.renderItem}
                renderEmptyDate={this.renderEmptyDate}
                // rowHasChanged={this.rowHasChanged}
                markingType={'period'}
                // markedDates={this.markedDates}
                monthFormat={'yyyy/MM'}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    arrowColor: 'orange',
                    monthTextColor: 'blue',

                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16,
                }}
                theme={{
                    agendaDayTextColor: 'orange',
                    agendaDayNumColor: 'green',
                    agendaTodayColor: 'red',
                    agendaKnobColor: 'blue',
                }}
                // renderDay={(day, item) => <Text>{day ? day.day : '_item'}</Text>}
                hideExtraDays={false}
            />
        );
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30,
    },
    video: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        width: '100%',
    },
});
