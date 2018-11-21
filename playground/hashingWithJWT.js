const {SHA256}  = require('crypto-js')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')

var password = '123abc!'

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash)
    })
})

var hashedPassword = '$2a$10$uDm6lETpWOypP6I7zAJHGucikMmzO3.EPeFZ.1JKlb4AwPe0tu7YO'
bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res)
})


//jwt.sign //takes de data and our secret sign it
//jwt.verify 

/*
var data = {
    id: 10
}

var token = jwt.sign(data, '123abc')
console.log(token)


var decoded = jwt.verify(token, '123abc')

console.log(decoded)
*/