import React,{Component} from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import Dashboard from './components/Dashboard'
import reducer from './reducers/index'
import Constants from 'expo-constants';

// const store = createStore(
//   reducer,
//   applyMiddleware(thunk, logger)
// )

export default class App extends Component{
  render(){
    return(
      // <Provider store={store}>
        <View>
          <Dashboard/>
        </View>
      // </Provider>
    )
  }
}

