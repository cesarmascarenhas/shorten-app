# About the Server Back-end

The back-end was designed in `node.js` technology. For this project the mockup database was handle locally by the lowdb framework. For more about it, please visit the official repository on https://github.com/typicode/lowdb

The database structure and data can be seen in the database folder, **`db.json`** file

# API Server
The port can be configured on `config.js` found in the root directory

To install and start the API server, run the following commands in this directory:

* `npm install`
* `node server`

the server will start on the configured port

## Using The Server

All Post requests should use an **JSON format** pattern:

```js
    {
        "username": "testuser"
        "password": "testpass"
    }
```

### API Endpoint

The following endpoints are available:

| Endpoints       | Usage          | Params         |
|-----------------|----------------|----------------|
| `POST /authenticate` | [Object] Returns the registered user object or an error message  | **username** - [String], **pasword** - [String]  |
| `POST /users/add` | [Object] Register new user, return error if username already exists | **username** - [String], **pasword** - [String] |
| `POST /urls/add` | [Object] Register new url. If the url to be registered already exists, returns the existing shortened obj  | **long** - [String] URL to be shortened. The system handles internally urls in pattern long or short format, **id** [Integer][Optional] If a logged user is registering this URL |
| `GET /urls/:id` | [Array] Returns the user collection of URLs | **id** - [Integer] User id returned either by `/authenticate` or `/users/add`  |
| `GET /url/:id` | Returns the shortened URL | **id** - [String]  |

## Returned URL Object
the Shortened url Object is returned as follows

```js
    {
        "id": 154,
        "short": "R7xxeP",
        "long": "http://localhost:3000/",
        "timestamp": 1548013720949,
        "meta": {
            "title": "Shorten",
            "description": "This is really cool!"
        },
        "views": 7
    }
```