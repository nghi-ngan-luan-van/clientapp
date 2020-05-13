import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {Input} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { AppRoute } from '../../navigation/app-routes';

class AddingCamera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      rtspUrl: '',
    };
    this.token = null;
  }

  async componentDidMount() {
    this.token = await AsyncStorage.getItem('userToken');
  }

  onAddCamera = async () => {
    //call api get all data of this user
    let { rtspUrl, name } = this.state;
    // // let camera = {
    // //     "camera": cam
    // // }

    // // camera = JSON.stringify(camera)
    // console.log("cam", this.state)

    let token = await AsyncStorage.getItem('userToken');
    // var requestOptions = {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': `Bearer ${token}`,
    //         "Content-Type": "application/json"
    //     },

    //     body: {
    //         rtspUrl,
    //         name
    //     },
    //     // redirect: 'follow'
    // };
    // console.log('camera', requestOptions)

    // await fetch("http://206.189.34.187/camera/add", requestOptions)
    //     .then(response => response.text())
    //     .then(result => {
    //         console.log(result)
    //     })
    //     .catch(error => console.log('error', error));

    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${token}`,
    );
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      rtspUrl,
      name,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    await fetch('http://206.189.34.187/camera/add', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result)
        const {navigation}=this.props
        navigation.push(AppRoute.HOME)
      })
      .catch((error) => console.log('error', error));
  };

  render() {
    // let camera = {
    //     name: '',
    //     rtspUrl: '',
    // }
    return (
      <View>
        <Input
          placeholder="Name"
          leftIcon={{type: 'font-awesome', name: 'comment'}}
          style={{height: '36'}}
          onChangeText={(name) => this.setState({name})}
        />

        <Input
          placeholder="Url"
          leftIcon={{type: 'font-awesome', name: 'comment'}}
          style={{height: '36'}}
          onChangeText={(rtspUrl) => this.setState({rtspUrl})}
        />

        <Button title={'ADD'} onPress={this.onAddCamera} />
      </View>
    );
  }
}

export default AddingCamera;
