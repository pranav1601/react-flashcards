import React,{Component} from 'react'
import { Platform,StyleSheet,Text,View,StatusBar} from 'react-native';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import Dashboard from './components/Dashboard'
import reducer from './reducers/index'
import Constants from 'expo-constants';
import AppContainer from './navigation/AppContainer'

const store = createStore(
  reducer,
  applyMiddleware(thunk, logger)
)

function DeckBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default class App extends Component{
  render(){
    return(
      <Provider store={store}>
        <View>
        <AppContainer/>
          <DeckBar
            backgroundColor="red"
            barStyle="light-content"
          />
          
        </View>
      </Provider>
    )
  }
}

