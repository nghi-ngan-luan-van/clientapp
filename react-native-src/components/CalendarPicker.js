import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import AgendaView from 'react-native-calendars/src/agenda';
import moment from 'moment';
import { AppRoute } from '../navigation/app-routes';
import { Colors } from '../utils/AppConfig';
export default class CalendarPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: {},
            data: this.props.data,
            recordVideos: this.props.backupList,
            markedDates: {},
        };
        this.newData = {};
        this.newBackupList = {};
        this.allData = {};

        this.markedDates = {};
        // this.loadItems = this.props.data;
    }
    componentDidMount = () => {};

    groupTime = () => {
        const { data } = this.state;
        //console.log('this.state.data', this.state.data);
        Array.isArray(data) &&
            data.forEach((value, index, arr) => {
                const date = moment(Number(value.timeStart)).startOf('day');
                let newValue = value;
                // newValue.startingDay = true;
                // newValue.endingDay = true;
                // newValue.color = 'pink';
                const strDate = this.timeToString(date);
                this.markedDates[strDate] = {
                    startingDay: true,
                    endingDay: true,
                    color: Colors.pigeon_post,
                };

                if (!this.newData[strDate]) {
                    this.newData[strDate] = [];
                }
                this.newData[strDate].push(value);
            });
    };
    groupBackupListTime = () => {
        // //console.log(this.props);
        let { recordVideos } = this.state;
        //console.log('recordVideos', this.props.backupList);
        this.props.backupList.forEach((value, index, arr) => {
            const date = moment(Number(value.timeStart)).startOf('day');
            const strDate = this.timeToString(date);
            if (!this.newBackupList[strDate]) {
                this.newBackupList[strDate] = [];
            }
            this.newBackupList[strDate].push(value);
        });
    };
    loadItems = day => {
        setTimeout(async () => {
            const time = day.timestamp;
            const strTime = this.timeToString(time);
            //console.log('time', time, 'strTime', strTime);
            this.newData = {};
            this.newBackupList = {};
            this.allData = {};
            this.groupTime();
            this.groupBackupListTime();
            if (!this.newData[strTime]) {
                this.newData[strTime] = [];
            }
            if (!this.newBackupList[strTime]) {
                this.newBackupList[strTime] = [];
            }
            this.allData = this.newData;
            //console.log('this.allData ', this.allData);

            this.newBackupList[strTime].forEach((value, index, arr) => {
                this.allData[strTime].push(value);
            });
            //console.log('this.newData', this.newData);
            //console.log('this.newbackupList ', this.newBackupList);
            //console.log('this.allData ', this.allData);

            // this.props.setBackupList(this.newBackupList[strTime]);
            setTimeout(() => {
                let newItems = this.state.items;
                newItems[strTime] = this.allData[strTime];
                this.setState({ items: newItems });
            }, 1000);
        }, 1000);
    };
    findVideo = item => {
        const date = moment(Number(item.timeStart)).startOf('day');
        const strDate = this.timeToString(date);
        //console.log(strDate);
        const found = this.newBackupList[strDate].filter(value => {
            return item.timeStart >= value.timeStart && item.timeStart <= value.timeEnd;
        });
        return found[0];
    };
    renderVideoByItem = item => {
        let { navigation } = this.props;
        if (item.cdnUrl === null) {
            //console.log('aa');
            const found = this.findVideo(item);
            //console.log(found);
            if (found) {
                navigation &&
                    navigation.navigate(AppRoute.VIDEO_PLAYER_SCREEN, {
                        video: found,
                        seekTime: Number(item.timeStart - found.timeStart),
                    });
            }
        } else {
            //console.log('renderVideoByItem', this.props);
            navigation && navigation.navigate(AppRoute.VIDEO_PLAYER_SCREEN, { video: item });
        }
    };
    renderItem = item => {
        // //console.log('item', item);
        const d = new Date(Number(item.timeStart));
        const n = d.toLocaleTimeString();
        const end = new Date(Number(item.timeEnd)).toLocaleTimeString();
        //console.log('n', n);
        return (
            <TouchableOpacity
                testID={'ITEM'}
                style={[styles.item, { height: 50 }]}
                onPress={() => this.renderVideoByItem(item)}
            >
                <Text>{item.cdnUrl !== null ? `📷 ${n} - ${end} ` : ` 🚶  ${n} - ${end}`}</Text>
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
        const { getDate } = this.props;
        //console.log('nar', this.markedDates);
        return (
            <AgendaView
                testID={'CONTAINER'}
                items={this.state.items}
                // markedDates={this.markedDates}
                loadItemsForMonth={this.loadItems}
                onDayPress={day => {
                    getDate && getDate(day);
                    console.log('day pressed', day);
                }}
                // callback that gets called when day changes while scrolling agenda list
                onDayChange={day => {
                    //console.log('day changed');
                }}
                // selected={'2020-06-10'}
                renderItem={this.renderItem}
                renderEmptyDate={this.renderEmptyDate}
                markedDates={this.markedDates}
                // rowHasChanged={this.rowHasChanged}
                markingType={'period'}
                monthFormat={'yyyy/MM'}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: 'blue',
                    selectedDayTextColor: 'blue',
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
                // theme={{
                //     agendaDayTextColor: 'orange',
                //     agendaDayNumColor: 'green',
                //     agendaTodayColor: 'red',
                //     agendaKnobColor: 'blue',
                // }}
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
