# About the Front-end

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

For definition, projects in React are already modular and easily extensible.

Here, it utilizes redux for the app global state and data control. Universal fail messages, user logis, urls, etc.


# Install and Run project

## `With the server already started`

### `npm install`
### `npm start`

# Test App

A test user is available, with pre populated data.

username:`testuser`
password:`testpass`

feel free for create new ones, and start from scratch


### APP structure


This Project utilizes the following structure, for the most important components and logic
```
.
|___ src
      |___ actions
      |      |___ index.js
      |___ API
      |      |___ index.js  
      |___ assets
      |      |___ imgs
      |             |___ bg-image.jpg
      |___ components
      |      |___ Home
      |      |       |___ index.js
      |      |___ Login
      |      |       |___ index.js
      |      |___ Logout
      |      |       |___ index.js
      |      |___ RedirectUrl
      |      |       |___ index.js
      |      |___ ShortenedCard
      |      |       |___ index.js
      |      |___ ShortenedUrls
      |      |       |___ index.js
      |      |       |___ ShorteneUrlsItem.js
      |      |___ StaticContent
      |              |___ index.js
      |      |___ SystemAlert
      |      |       |___ index.js
      |      |___ index.js
      |___ redurcers
      |      |___ index.js
```
| Component       | Usage                       |
|-----------------|-----------------------------|
| `Home` | Responsible for the add posts and display urls history for logged in users  |
| `Login` | Handles create and authenticate users  |
| `Logout` | Logout user and clear status  |
| `RedirectUrl` | Redirects shortened codes and display 404 if URL not registered |
| `ShortenedCard` | Displays props for the URL returned by the server. Offers copy to clipboard option |
| `ShortenedUrls` | Displays all urls added by the logged user |
| `StaticContent` | Placeholder for fake static content |
| `SystemAlert` | UI feedback for global error returned by either the user action or the server |


## Database - Redux
Actions and recucers handles the following data

`user` [Object]
```
Logged user props
```

`shorten` [Object]
```
URL shortened returned by the server. Pre tested for incorrect url enter
```
`status` [Object]
```
UI feedback for error, logging, registering, fetching data 
```
`urls` [Array][Objects]
```
URLs history for the logged user
```