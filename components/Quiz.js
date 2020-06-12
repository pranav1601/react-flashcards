import React, { Component } from 'react';
import {Platform} from 'react-native';
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
    if(Platform.OS==='android' || Platform.OS==='ios'){
      notification()
    }    
  }
  render() {
    const { navigation } = this.props;
    const title = navigation.getParam('title', '');

    
      return <IOSPlat title={title} />;
    
    
  }
}

export default Quiz;