import {RECEIVE_DECKS,ADD_DECK,DELETE_DECK,ADD_CARD,RESET} from '../actions/index'
import {decks} from '../utils/DATA'

export default function deckReducer(state={},action){
    switch(action.type){
        case RECEIVE_DECKS:
            return{
                ...state,
                ...action.decks
            }
        case ADD_CARD:
            const {id,card}=action
            return{
                ...state,
                [id]:{
                    ...state[id],
                    cards:[...state[id].cards].concat(card)
                }
            }
            
        case ADD_DECK:
            const title=action.title
            return{
                ...state,
                [title]:{
                    title,
                    cards:[]
                }
            }
        case RESET:
            return decks
        case DELETE_DECK:
            // console.log(action.title)
            // delete state.decks[action.title]
            // return {
            //     ...state
            // }
            const { [action.title]: value, ...remainingDecks } = state;
            return remainingDecks;
        default:
            return state
    }
}

