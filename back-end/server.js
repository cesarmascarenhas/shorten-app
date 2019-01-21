require('dotenv').config()

const express       = require('express')
const bodyParser    = require('body-parser')
const cors          = require('cors')
const config        = require('./config')
const db            = require('./database')
const app           = express()

app.use(express.static('public'))
app.use(cors())

app.get('/users', (req, res) => {
    db.getUsers().then(
        (data) => res.json(data),
        (error) => {
            console.error(error)
            res.status(500).send({
                error: 'There was an error.'
            })
        }
    )    
})

app.post('/users/authenticate', bodyParser.json(), (req, res) => {
    setTimeout(() => {
    db.getUser(req.body).then(
        (data) => res.json(data[0]),
        (error) => {
            console.error(error)
            res.status(500).send(error)
        }
    )
    },2000)     
})

app.post('/users/add', bodyParser.json(), (req, res) => {
    setTimeout(() => {
    db.setUser(req.body).then(
        (data) => res.json(data),
        (error) => {
            console.error(error)
            res.status(500).send(error)
        }
    )
    },2000)    
})

app.get('/urls/:id', bodyParser.json(), (req, res) => {
    db.getUserUrls( req.params.id ).then(
        (data) => res.json(data),
        (error) => {
            console.error(error)
            res.status(500).send(error)
        }
    )    
})

app.post('/urls/add', bodyParser.json(), (req, res) => {
    setTimeout(() => {
        db.setUrl( req.body ).then(
            (data) => res.json(data),
            (error) => {
                console.error(error)
                res.status(500).send(error)
            }
        ) 
    },2000)       
})

app.get('/url/:code', bodyParser.json(), (req, res) => {
    db.getUrlByCode( req.params.code ).then(
        (data) => res.json(data[0]),
        (error) => {
            console.error(error)
            res.status(500).send(error)
        }
    )    
})


app.listen(config.port, () => {
    console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})