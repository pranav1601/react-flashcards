import React from 'react'
import {Platform} from 'react-native'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createStackNavigator} from 'react-navigation-stack'
import Dashboard from '../components/Dashboard'
import DeckInfo from '../components/DeckInfo'
import NewCard from '../components/NewCard'
import NewDeck from '../components/NewDeck'
import Quiz from '../components/Quiz'
import Reset from '../components/Reset'
import {green,red,blue,white, darkGray,lightGreen} from '../utils/colors'
import * as Icon from '@expo/vector-icons';

const routeConfigs = {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => (
          <Icon.Ionicons
            name={Platform.OS==='ios' ? 'ios-bookmarks' : 'md-bookmarks'}
            size={30}
            color={tintColor}
          />
        )
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ tintColor }) => (
          <Icon.FontAwesome name="plus-square" size={25} color={tintColor} />
        )
      }
    },
    Reset: {
      screen: Reset,
      navigationOptions: {
        tabBarLabel: 'Reset',
        tabBarIcon: ({ tintColor }) => (
          <Icon.FontAwesome name="sliders" size={25} color={tintColor} />
        )
      }
    }
}


const tabNavigatorConfig = {
    navigationOptions: {
      headerShown: false
    },
    defaultNavigationOptions: {
      bounces: true
    },
    tabBarOptions: {
      activeTintColor: green,
      style: {
        height: 60,
        backgroundColor: white,
        shadowColor: 'rgba(0,0,0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1,
        borderTopWidth: 1,
        borderTopColor: darkGray
      },
      labelStyle: {
        fontSize: 12,
        fontWeight: 'bold'
      },
      tabStyle: {
        marginTop: 5,
        marginBottom: 3
      },
      showIcon: true
    }
  }

  const Tabs = createBottomTabNavigator(routeConfigs, tabNavigatorConfig)

  const Navigator = createStackNavigator(
    {
      Home: {
        screen: Tabs
      },
      DeckInfo: {
        screen: DeckInfo,
        navigationOptions: {
          headerTitleAlign: 'center',
          headerTintColor: green,
          headerStyle: {
            backgroundColor: lightGreen
          },
          title: 'Deck Information'
        }
      },
      NewCard: {
        screen: NewCard,
        navigationOptions: {
          headerTitleAlign: 'center',
          headerTintColor: green,
          headerStyle: {
            backgroundColor: lightGreen
          },
          headerTitleStyle: {
            justifyContent: 'center',
            textAlign: 'center'
          },
          title: 'Add Card'
        }
      },
      Quiz: {
        screen: Quiz,
        navigationOptions: {
          headerTintColor: green,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: lightGreen
          }
        }
      }
    }
  );
  
  export default Navigator

