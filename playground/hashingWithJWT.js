const {SHA256}  = require('crypto-js')

const jwt = require('jsonwebtoken')

//jwt.sign //takes de data and our secret sign it
//jwt.verify 

var data = {
    id: 10
}

var token = jwt.sign(data, '123abc')
console.log(token)


var decoded = jwt.verify(token, '123abc')

console.log(decoded)


/*
var message = 'I am user number 34'
var hash = SHA256(message).toString()

console.log(message)
console.log(hash)

var data = {
    id : 4
}

var token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'SALT').toString()
}

//Modifing data trying to be user 5

token.data.id = 5
token.hash = SHA256(JSON.stringify(token.data)).toString()


var resultHash = SHA256(JSON.stringify(token.data) + 'SALT').toString()

if (resultHash === token.hash){
    console.log('Data was not changed')
}else {
    console.log('Data was changed, DO NOT trust')
}

//Esse é o conceito de JWT- Jason Web Token
*/