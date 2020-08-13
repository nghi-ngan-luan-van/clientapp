import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import AgendaView from 'react-native-calendars/src/agenda';
import moment from 'moment';
import { AppRoute } from '../navigation/app-routes';
import { Colors } from '../utils/AppConfig';
import { Icon } from 'react-native-elements';
const calendarTheme = {
    backgroundColor: Colors.white,
    calendarBackground: Colors.white,
    textSectionTitleColor: '#b6c1cd',
    textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: '#00adf5',
    selectedDayTextColor: Colors.alert,
    todayTextColor: Colors.purple_blue,
    dayTextColor: Colors.grey,
    textDisabledColor: '#d9e1e8',
    dotColor: '#00adf5',
    selectedDotColor: Colors.alert,
    arrowColor: 'orange',
    disabledArrowColor: '#d9e1e8',
    monthTextColor: 'blue',
    indicatorColor: 'blue',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16,
};
export default class CalendarPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: {},
            data: this.props.data || [],
            recordVideos: this.props.backupList || [],
        };
        this.newData = {};
        this.newBackupList = {};
        this.allData = {};

        this.markedDates = {};
        // this.loadItems = this.props.data;
    }
    componentDidMount = () => {
        this.groupTime(markedDates => {
            console.log('new', markedDates);
            this.setState({ markedDates: markedDates });
        });
    };
    componentWillUnmount() {
        if (this.timer1) {
            clearTimeout(this.timer1);
        }
        if (this.timer2) {
            clearTimeout(this.timer2);
        }
    }

    groupTime = callback => {
        const { data } = this.state;
        const { getItems } = this.props;
        //console.log('this.state.data', this.state.data);
        // getItems && getItems(this.state.items);
        // console.log('Iamherea');
        let markedDates = {};
        // let newData = [];

        Array.isArray(data) &&
            data.forEach((value, index, arr) => {
                const dayToNumber = Number(value.timeStart);
                // console.log()
                if (dayToNumber) {
                    const date = new Date(dayToNumber);

                    const strDate = this.timeToString(date);
                    markedDates[strDate] = {
                        startingDay: true,
                        endingDay: true,
                        color: Colors.screen,
                        // marked: true,
                    };

                    if (!this.newData[strDate]) {
                        this.newData[strDate] = [];
                    }
                    this.newData[strDate].push(value);
                }
            });
        callback && callback(markedDates);
    };
    groupBackupListTime = () => {
        let { recordVideos } = this.state;
        // let {backupList}=this.props;
        Array.isArray(recordVideos) &&
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
        // console.log('new0000000', this.state.markedDates);
        // this.timer1 = setTimeout(() => {

        const { getItems } = this.props;
        const time = day.timestamp;
        const strTime = this.timeToString(time);
        this.newData = {};
        this.newBackupList = {};
        this.allData = {};
        // try {
        this.groupTime();

        this.groupBackupListTime();

        if (!this.newData[strTime]) {
            this.newData[strTime] = [];
        }
        if (!this.newBackupList[strTime]) {
            this.newBackupList[strTime] = [];
        }
        this.allData = this.newData;
        if (this.newBackupList && this.newBackupList[strTime]) {
            this.newBackupList[strTime].forEach((value, index, arr) => {
                this.allData[strTime].push(value);
            });
        }

        let newItems = this.state.items;
        newItems[strTime] = this.allData[strTime];
        this.setState({ items: newItems }, () => {});

        // const time = day.timestamp;
        // const strTime = this.timeToString(time);

        // } catch (e) {
        //     console.log(e);
        // }
        // }, 500);
        // }, 500);
        // return 1;
    };
    findVideo = item => {
        const date = moment(Number(item.timeStart)).startOf('day');
        const strDate = this.timeToString(date);
        const found =
            this.newBackupList[strDate] &&
            this.newBackupList[strDate].filter(value => {
                return item.timeStart >= value.timeStart && item.timeStart <= value.timeEnd;
            });
        return found && found[0];
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
            navigation && navigation.navigate(AppRoute.VIDEO_PLAYER_SCREEN, { video: item });
        }
    };
    renderItem = item => {
        // //console.log('item', item);
        const d = new Date(Number(item.timeStart));
        const n = d.toLocaleTimeString();
        const end = new Date(Number(item.timeEnd)).toLocaleTimeString();
        //console.log('n', n);
        const color = item.cdnUrl ? Colors.alert : Colors.brandy_rose;
        return (
            <TouchableOpacity
                testID={'ITEM'}
                style={[
                    styles.item,
                    {
                        height: 50,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: Colors.screen,
                    },
                ]}
                onPress={() => this.renderVideoByItem(item)}
            >
                <Icon
                    // name={item.cdnUrl !== null ? 'play' : 'warning'}
                    name={'play'}
                    type={'antdesign'}
                    // color={'white'}
                    color={item.cdnUrl ? Colors.alert : Colors.brandy_rose}
                    size={20}
                />
                <Text style={{ color: Colors.purple_blue }}> {` ${n} - ${end}`}</Text>
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
        if (!time) {
            const dateStr = new Date();
            const date = dateStr.getDate() < 10 ? `0${dateStr.getDate()}` : dateStr.getDate();
            const month =
                dateStr.getMonth() < 10 ? `0${dateStr.getMonth() + 1}` : dateStr.getMonth();
            const year = dateStr.getFullYear();
            return year + '-' + month + '-' + date;
        } else {
            const date = new Date(time);
            return date.toISOString().split('T')[0];
        }
    };
    render() {
        const { getDate, getItems } = this.props;
        // console.log('nar', this.state.markedDates);
        return (
            <AgendaView
                items={this.state.items}
                markedDates={this.state.markedDates}
                loadItemsForMonth={date => this.loadItems(date)}
                onDayPress={day => {
                    getDate && getDate(day);

                    // const { getItems } = this.props;
                    // getItems(this.state.items);
                    // console.log('day pressed', day);
                }}
                // callback that gets called when day changes while scrolling agenda list
                onDayChange={day => {
                    //console.log('day changed');
                }}
                selected={new Date()}
                renderItem={this.renderItem}
                renderEmptyDate={this.renderEmptyDate}
                // rowHasChanged={this.rowHasChanged}
                markingType={'period'}
                monthFormat={'yyyy/MM'}
                // Agenda theme
                theme={{
                    ...calendarTheme,
                    agendaDayTextColor: 'yellow',
                    agendaDayNumColor: 'green',
                    agendaTodayColor: 'red',
                    agendaKnobColor: 'blue',
                    // selectedDayTextColor: ?Colors.pomegranate : '#fff',
                }}
                // Agenda container style
                // style={{ backgroundColor: Colors.screen }}
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
