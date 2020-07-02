import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AgendaView from 'react-native-calendars/src/agenda';

export default class CalendarPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: {},
        };
        this.data = this.props.data;
        this.markedDates = {
            // '2017-05-08': { textColor: '#43515c' },
            // '2017-05-09': { textColor: '#43515c' },
            // '2017-05-14': { startingDay: true, endingDay: true, color: 'pink' },
            // '2017-05-21': { startingDay: true, color: 'blue' },
            // '2017-05-22': { endingDay: true, color: 'gray' },
            // '2017-05-24': { startingDay: true, color: 'gray' },
            // '2017-05-25': { color: 'gray' },
            '2020-07-02': { startingDay: true, endingDay: true, color: 'pink' },
        };
        // this.loadItems = this.props.data;
    }

    componentDidMount = () => {
        this.data = this.formatData(this.data);
    };

    formatData = data => {
        if (!data) {
            return data;
        } else {
            let newData = [];
            data.map((item, index) => {
                let { timeStart } = item;
            });
            return newData;
        }
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
                // selected={'2017-05-16'}
                renderItem={this.renderItem}
                renderEmptyDate={this.renderEmptyDate}
                rowHasChanged={this.rowHasChanged}
                markingType={'period'}
                markedDates={this.markedDates}
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
                // theme={{
                //     agendaDayTextColor: 'yellow',
                //     agendaDayNumColor: 'green',
                //     agendaTodayColor: 'red',
                //     agendaKnobColor: 'blue',
                // }}
                // renderDay={(day, item) => <Text>{day ? day.day : '_item'}</Text>}
                hideExtraDays={false}
            />
        );
    }

    loadItems = day => {
        setTimeout(() => {
            // for (let i = -15; i < 85; i++) {
            const time = day.timestamp;
            const strTime = this.timeToString(time);

            if (!this.state.items[strTime]) {
                this.state.items[strTime] = [];
                const numItems = 2;
                // const numItems = Math.floor(Math.random() * 3 + 1);
                for (let j = 0; j < numItems; j++) {
                    this.state.items[strTime].push({
                        name: 'Item for ' + strTime + ' #' + j,
                        height: Math.max(50, Math.floor(Math.random() * 150)),
                    });
                }
            }
            // }
            const newItems = {};
            Object.keys(this.state.items).forEach(key => {
                newItems[key] = this.state.items[key];
            });
            this.setState({
                items: newItems,
            });
        }, 1000);
    };

    renderItem = item => {
        return (
            <TouchableOpacity
                testID={'ITEM'}
                style={[styles.item, { height: item.height }]}
                onPress={() => Alert.alert(item.name)}
            >
                <Text>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    renderEmptyDate = () => {
        return (
            <View style={styles.emptyDate}>
                <Text>This is empty date!</Text>
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
});
