import * as api from "../API";

//export const LOGIN_REQUESTED    = 'LOGIN_REQUESTED'
//export const LOGIN_FAILED       = 'LOGIN_FAILED'
//export const LOGIN_SUCCESS      = 'LOGIN_SUCCESS'

export const LOGIN_USER         = 'LOGIN_USER'
export const LOGOUT_USER        = 'LOGOUT_USER'
export const ADD_USER           = 'ADD_USER'
export const SHORTEN_URL        = 'SHORTEN_URL'
export const FETCH_URLS         = 'FETCH_URLS'
export const CLEAR_URLS         = 'CLEAR_URLS'
export const GET_URL            = 'GET_URL'


export const APP_STATUS_REQUESTED   = 'APP_STATUS_REQUESTED'
export const APP_STATUS_SUCCESS     = 'APP_STATUS_SUCCESS'
export const APP_STATUS_FAILED      = 'APP_STATUS_FAILED'
export const APP_STATUS_CLEAR       = 'APP_STATUS_CLEAR'



const request = () => {
    return {
        type:APP_STATUS_REQUESTED,
        status:{ requested:true }
    }
}

export const failed = (msg) => {
    return {
        type:APP_STATUS_FAILED,
        status:{ failed:true, msg:msg }
    }
}

export function clearStatus(){
    return {
        type:APP_STATUS_CLEAR
    }
}

export function addUser(user){

    const success = () => {
        return {
            type:APP_STATUS_SUCCESS,
            status:{ registered:true }
        }
    }

    return function (dispatch){        
        dispatch(request())        
        api.addUser(user).then( (data) => {

            if(data.error){
                dispatch( failed(data.error))
            } else {
                dispatch( {
                    type:ADD_USER,
                    user:data
                })
                dispatch( success() )
            } 
           
        })
    }
}


export function loginUser(user){


    const success = () => {
        return {
            type:APP_STATUS_SUCCESS,
            status:{ logged:true }
        }
    }

    return function (dispatch){        
        dispatch(request())        
        api.authenticate(user).then( (data) => {

            if(data.error){
                dispatch( failed(data.error))
            } else {
                dispatch( {
                    type:ADD_USER,
                    user:data
                })
                dispatch( getUserUrls(data) )
                dispatch( success() )
            }         
             
        })
    }

}

export function logoutUser(){
    return function (dispatch) {
        dispatch(clearStatus())
        dispatch({type:LOGOUT_USER})
        dispatch({type:CLEAR_URLS})
    }
}

export function addUrl(info){    

    const success = () => {
        return {
            type:APP_STATUS_SUCCESS,
            status:{ shortened:true }
        }
    }

    console.log(info)

    return function (dispatch){        
        dispatch(request())        
        return api.addUrl({...info}).then( (data) => {
            if(data.error){
                dispatch(failed(data.error))
            } else {
                dispatch( {
                    type:SHORTEN_URL,
                    url:data
                })
                if(info.id !== undefined) {
                    dispatch( getUserUrls(info) )
                }
                dispatch( success() )
            }
            
        })
    }

}

export function getUserUrls(user){
    return function (dispatch){
        api.getUserUrls(user).then( data => {            
            dispatch( {
                type:FETCH_URLS,
                urls: data.error ? [] : data.reverse()
            })
                           
        })
    }
}

export function getUrl(code){
    return function (dispatch){
        api.getUrl(code).then( data => { 
            dispatch( {
                type:SHORTEN_URL,
                url: data
            })
                           
        })
    }
}