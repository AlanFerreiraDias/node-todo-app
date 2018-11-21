//const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')

// var obj = new ObjectID();
// console.log(obj)

// //object destructuring
// var user = {name: 'alan', age: 28}
// var {name} = user //gets the name property from the object user
// console.log(name)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
       return console.log('Unable to connect to Mongo db')
    }
    console.log('connect to Mongo db')
    const db = client.db('TodoApp')

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err,result) => {
    //     if(err){
    //         return console.log('Unable to insert todo', err)
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2))
    // })

    //Insert new doc into users (name, age, location)
    // db.collection('Todos').insertOne({
    //     name: 'Alan',
    //     age: 28
    // }, (err,result) => {
    //     if(err){
    //         return console.log('Unable to insert todo', err)
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2))
    // })

    client.close()
})