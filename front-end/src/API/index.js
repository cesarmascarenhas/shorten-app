const api = 'http://localhost:3001';


const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

export const authenticate = (user) => fetch(`${api}/users/authenticate`, { method: 'POST', headers, body: JSON.stringify(user) } )
    .then(res => res.json())
    .then(data => data)

export const addUser = (user) => fetch(`${api}/users/add`, { method: 'POST', headers, body: JSON.stringify(user) })
    .then(res => res.json())
    .then(data => data)

export const addUrl = (url) =>  fetch(`${api}/urls/add`, { method: 'POST', headers, body:JSON.stringify(url) })
    .then(res => res.json())
    .then(data => data)

export const getUserUrls = (user) =>  fetch(`${api}/urls/${user.id}`, { method: 'GET', headers })
    .then(res => res.json())
    .then(data => data)


export const getUrl = (code) =>  fetch(`${api}/url/${code}`, { method: 'GET', headers })
    .then(res => res.json())
    .then(data => data)