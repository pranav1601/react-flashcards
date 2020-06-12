import {AsyncStorage,Platform} from 'react-native'
import {decks} from './DATA'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import {Notifications} from 'expo'



const STORAGE_KEY='Flashcards:decks'

export function getData(){
    return decks
}

export async function getDecks(){
    const results=await AsyncStorage.getItem(STORAGE_KEY)
    if(results===null){
        AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(decks))
    }
    return results===null?decks:JSON.parse(results)
}
export async function getDeck(id){
    const results=await AsyncStorage.getItem(STORAGE_KEY)
    return JSON.parse(results)[id]
}

export async function resetApi(){
    await AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(decks))
}

export async function remove(key){
    try{
        const results=await AsyncStorage.getItem(STORAGE_KEY)
        const value=JSON.parse(results)
        value[key]=undefined
        delete value[key]
        AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(value))
    }catch(err){
        console.log(err)
    }
    
}

export async function save(title){
    await AsyncStorage.mergeItem(
        STORAGE_KEY,JSON.stringify({
            [title]:{title,
                cards:[]}
        })
    )
}

function results(result){
    return result===null?decks:JSON.parse(results)
}

export function prevDecks(){
    return AsyncStorage.getItem(STORAGE_KEY).then(results)
}

export async function addCardApi(title,card){
    const deck=await getDeck(title)
    await AsyncStorage.mergeItem(
        STORAGE_KEY,JSON.stringify({
            [title]:{
                cards:[...deck.cards].concat(card)
            }
        })
    )
}

export function attemptedQuiz() {
    let nowDate = new Date()
    nowDate = `${nowDate.getDate()}/${nowDate.getMonth()+1}/${nowDate.getFullYear()}`
    return AsyncStorage.getItem( 'dateLatestAttempted', ( err, result ) => {
        return ( JSON.parse( result ) === nowDate ) ? true : false
    } )
}

const NOTIFICATION_KEY = 'MobileFlashcard:notifications';
const CHANNEL_ID = 'DailyReminder';

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
      Notifications.cancelAllScheduledNotificationsAsync
    );
  }

  function createNotification() {
    return {
      title: 'Mobile Flashcards Reminder',
      body: "👋 Don't forget to study for today!",
      ios: {
        sound: true
      },
      android: {
        channelId: CHANNEL_ID,
        sticky: false,
        color: 'red'
      }
    };
  }
  
  function createChannel() {
    return {
      name: 'Daily Reminder',
      description: 'This is a daily reminder for you to study your flashcards.',
      sound: true,
      priority: 'high'
    };
  }
  
  export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then(data => {
        // if (true) {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
            // console.log('got in');
            // console.log('data', data);
            if (status === 'granted') {
              // Notifications.presentLocalNotificationAsync(createNotification());
              Notifications.createChannelAndroidAsync(CHANNEL_ID, createChannel())
                .then(val => console.log('channel return:', val))
                .then(() => {
                  Notifications.cancelAllScheduledNotificationsAsync();
  
                  const tomorrow = new Date();
                  // 2 minute from now
                  // tomorrow.setTime(tomorrow.getTime() + 2 * 60000);
  
                  tomorrow.setDate(tomorrow.getDate() + 1);
                  tomorrow.setHours(20);
                  tomorrow.setMinutes(0);
  
                  Notifications.scheduleLocalNotificationAsync(
                    createNotification(),
                    {
                      time: tomorrow,
                      repeat: 'day'
                    }
                  );
  
                  AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                })
                .catch(err => {
                  console.log('err', err);
                });
            }
          });
        }
      });
  }