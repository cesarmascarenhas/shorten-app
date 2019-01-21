const helper = require('../helpers')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./database/db.json')
const db = low(adapter)
db.read()


function getUsers() {
    return new Promise((res) => {
        res(db.get('users').value())
    })
}

function getUser(user) {
    return new Promise((res, rej) => {
        let user_in_db = db.get('users').filter(user).value()
            if( user_in_db.length > 0 ){
                let temp = {...user_in_db[0]}
                delete temp.password                
                res([temp])
            } else {
                rej({
                    error: "Wrong username or password."
                })
            }
    })
}

function userExists(user) {
    return new Promise((res) => {
        res(db.get('users').filter({
            username: user.username
        }).value())
    })
}

function setUser(user) {
    return new Promise((res, rej) => {
        userExists(user).then(
            (data) => {
                if (data.length > 0) {
                    rej({
                        error: 'User Already Exists'
                    })
                    return
                } else {
                    let users = db.get('users')
                        user = {
                            id: users.value().length,
                            ...user,
                            timestamp: + new Date(),
                            urls:[]
                        }
                        users.push(user).write()
                        res(user)
                }
            }
        )
    })
}

function getUserUrls(userId) {
    return new Promise((res, rej) => {

        let userUrls = db.get('users')
        .find({id: parseInt(userId)})
        .get('urls')
        .value()

        if(userUrls === undefined){
             return rej({
                error: "The user has no entries"
            })
        }

        let urls = db.get('urls').value()

        let result = userUrls.reduce( (accumulator, user_url) => {
            if(urls.some( url => url.id === user_url )){
                accumulator.push(urls[user_url])
            }
            return accumulator
        }, [])

        return result.length > 0 ? res(result) : rej({
            error: "The user has no entries"
        })

    })
}

function setUserUrls(userId,urlId) {

    let urls = db.get('users')
        .find({id: parseInt(userId)})
        .get('urls')
        .value()
    let founded = urls.some( url => url === urlId )

    if(!founded) {
        urls.push(urlId)
        db.get('users')
        .find({ id: userId })
        .assign({ urls })
        .write();
    }     
        
}

function codeExists(code) {
    let url_with_code = db.get('urls')
    .filter({short: code})
    .value()
    return url_with_code.length > 0 ? true : false
}

function getShortenedCode(){
    let code = helper.shorterChars()
    return codeExists(code) ? getShortenedCode() : code
}

function getUrl(url){
    let urldb = db.get('urls').filter({long:url.long}).value()
    return  urldb.length > 0 ? urldb : false
}

function getUrlByCode(code){
    return new Promise((res, rej) => {
        
        db.get('urls')
        .find({ short: code }) 
        .update('views', n=>n+1).write()
        
        let urldb = db.get('urls').filter({ short: code }).value()

        return urldb.length > 0 ? res(urldb) : rej({
            error: "URI not in shortener"
        })

    })
    
}


function setUrl(url){

    return new Promise((res, rej) => {
        
        let urls        = db.get('urls')
        let url_in_db   = getUrl(url)
        
        if(url_in_db !== false){

            if(url.id !== undefined){
                setUserUrls(url.id,url_in_db[0].id)
            }
            res(url_in_db[0]) 

        } else {

            helper.getMetaData(url.long).then( (data) => {
                newurl = {
                    id: urls.value().length,
                    short: getShortenedCode(),
                    long: url.long,
                    timestamp: + new Date(),
                    meta: { title:data.title, description:data.description },
                    views: 0
                }
                urls.push(newurl).write()
                if(url.id !== undefined){
                    setUserUrls(url.id,newurl.id)
                }
                res(newurl)
            }, (error) => rej({
                                error: "Invalid URI"
                            })
            )
            
        }
       
    })
    
}
module.exports = {
    getUsers,
    getUser,
    setUser,
    getUserUrls,
    setUserUrls,
    setUrl,
    getUrl,
    getUrlByCode
}