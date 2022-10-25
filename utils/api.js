import {AsyncStorage} from 'react-native'
import {decks} from './DATA'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import {Notifications} from 'expo'


const STORAGE_KEY='Flashcards:decks'

export function getData(){
    return decks
}

export async function getDecks(){
    const results = await AsyncStorage.getItem(STORAGE_KEY)
    if(results===null){
        AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(decks))
    }
    return results === null?decks:JSON.parse(results)
}
export async function getDeck(id){
    const results = await AsyncStorage.getItem(STORAGE_KEY)
    return JSON.parse(results)[id]
}

export async function resetApi(){
    await AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(decks))
}

export async function remove(key){
    try{
        const results = await AsyncStorage.getItem(STORAGE_KEY)
        const value = JSON.parse(results)
        value[key] = undefined
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

export function notification() {
    Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status})=>{
            if(Constants.isDevice && status==='granted'){
                Notifications.cancelAllScheduledNotificationsAsync().then((result) => {
                        const handleNotification = ({notificationId})=>{
                            this.attemptedQuiz().then((result)=>{
                                    (result) && Notifications.dismissNotificationAsync(notificationId)
                                } )
                        }
                        Notifications.addListener( handleNotification );
                        if ( Platform.OS === 'android' ) {
                            Notifications.createChannelAndroidAsync( 'card-reminder', {
                                name: 'card-reminder',
                                sound: true,
                                priority: 'max',
                            } )
                        }
                        const localNotification = {
                            title:'Reminder for quiz',
                            body:`Attempt the quiz please!`,
                            ios:{ sound: true},
                            android:{
                                channelId:'card-reminder',
                                color:"#101057",
                            }
                        };
                        let notificationTime = new Date()
                        let currTime = notificationTime.getTime()
                        notificationTime.setHours(18, 0, 0)
                        scheduleTime = notificationTime.getTime()
                        if (currTime>scheduleTime){
                            scheduleTime=scheduleTime+86400000
                        }
                        const scheduleOptions = {
                            time: scheduleTime,
                            repeat: 'day'
                        }
                        Notifications.scheduleLocalNotificationAsync(
                            localNotification, scheduleOptions
                        );
                    } )
            }
        } )
}