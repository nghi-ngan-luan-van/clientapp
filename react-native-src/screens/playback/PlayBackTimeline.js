import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
} from 'react-native';
import PropTypes from 'prop-types';

import Timeline from '../../components/TimeLine';


export default class PlayBackTimeline extends Component {
    constructor(props) {
        super(props);

    }

    _renderChildren=(item) =>{
        return (
           <Text>{item.title}</Text>
        );
    }

    render() {
        let datasource= [
            { time: '1:44', title: 'Event 1' },
            { time: '10:45', title: 'Event 2' },
            { time: '12:00', title: 'Event 3' },
            { time: '14:00', title: 'Event 4' },
            { time: '16:30', title: 'Event 5' }
        ]
        return (
            <View>
                <Timeline
                    ref='TestFather'
                    timelineDirection={'row'}
                    datasource={datasource}
                    renderChildren={this._renderChildren}
                />
                <Button
                    onPress={() => { this.refs.TestFather.scrollToIndex({ animated: true, index: 3 }) }}
                    title="View" />
            </View>

        );
    }
}