const {SHA256}  = require('crypto-js')

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