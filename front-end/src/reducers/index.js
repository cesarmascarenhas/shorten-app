import * as ACTIONS from '../actions'
import { combineReducers } from 'redux'

function user(state={},action){
    switch(action.type){
        case ACTIONS.ADD_USER :
            return {...action.user}
        case ACTIONS.LOGIN_USER :
            return {...action.user}
        case ACTIONS.LOGOUT_USER :
            return {}
        default:
            return state
    }
}
function shorten(state={},action){
    switch(action.type){
        case ACTIONS.SHORTEN_URL :
            return action.url 
        default:
            return state
    }
}

function status(state={},action){
    switch(action.type){        
        case ACTIONS.APP_STATUS_REQUESTED:
            return {
                ...action.status
            } 
        case ACTIONS.APP_STATUS_SUCCESS:
            return {
                ...action.status
            }
        case ACTIONS.APP_STATUS_FAILED:
            return {
                ...action.status
            }
        case ACTIONS.APP_STATUS_CLEAR:
            return {} 
        default:
            return state
    }
}

function urls(state=[],actions){
    switch(actions.type){        
        case ACTIONS.FETCH_URLS:
            return [...actions.urls] 
        case ACTIONS.CLEAR_URLS:
            return [] 
        default:
            return state
    }
}

export default combineReducers({
    user,
    shorten,
    status,
    urls
  })