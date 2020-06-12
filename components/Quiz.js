import React, { Component } from 'react';
import Constants from 'expo-constants';
import AndroidPlat from './AndroidPlat';
import IOSPlat from './IOSPlat';
import {notification } from '../utils/api';

export class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('title', '');
    return {
      title: `${title} Quiz`
    };
  };
  componentDidMount() {
    notification()
  }
  render() {
    const { navigation } = this.props;
    const title = navigation.getParam('title', '');

    if (Constants.platform.ios) {
      return <IOSPlat title={title} />;
    }
    return <AndroidPlat title={title} />;
    
  }
}

export default Quiz;