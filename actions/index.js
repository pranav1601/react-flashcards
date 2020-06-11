import {getDecks} from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_CARD = 'ADD_CARD';
export const ADD_DECK = 'ADD_DECK';
export const RESET = 'RESET';
export const DELETE_DECK = 'DELETE_DECK';

export function receiveDecks(decks){
    return{
        type:RECEIVE_DECKS,
        decks
    }
}

export function addCard(id,card){
    return{
        type:ADD_CARD,
        id,
        card
    }
}

export function addDeck(title){
    return{
        type:ADD_DECK,
        title
    }
}

export function reset(){
    return{
        type:RESET
    }
}

export function deleteDeck(title){
    return{
        type:DELETE_DECK,
        title
    }
}

export function handleInitialData() {
    return dispatch=>{
      return getDecks().then(decks=>{
        dispatch(receiveDecks(decks));
      });
    };
  }

