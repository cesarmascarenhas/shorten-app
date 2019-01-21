const urlMetadata = require('url-metadata')

const shorter_chars = [
    'a','b','c','d','e',
    'f','g','h','i','j',
    'k','l','m','n','o',
    'p','q','r','s','t',
    'u','v','w','x','y','z',
    'A','B','C','D','E',
    'F','G','H','I','J',
    'K','L','M','N','O',
    'P','Q','R','S','T',
    'U','V','W','X','Y','Z',
    '1','2','3','4','5','6',
    '7','8','9'
]
function shorterChars(){
    
    const max       = 6
    let stepper     = 0
    let selecteds   = []

    while(stepper < max){
        let random = ~~(Math.random() * shorter_chars.length)
        selecteds.push(shorter_chars[random])
        stepper++
    }

    return selecteds.join('')

} 

function getMetaData(url){
    return urlMetadata(url)
}


module.exports = {
    shorterChars,
    getMetaData
}