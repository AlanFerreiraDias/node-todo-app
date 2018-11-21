const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
       return console.log('Unable to connect to Mongo db')
    }
    console.log('connect to Mongo db')
    const db = client.db('TodoApp')

    //Search for an especific Id 
    //_id = new ObjectID('IdNumber')

    // db.collection('Todos').find({completed: false}).toArray().then((docs) => {
    //     console.log('Todos')
    //     console.log(JSON.stringify(docs, undefined, 2))
    // }, (err) => {
    //     console.log('Unable to fetch todos', err)
    // })

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count ${count}`)
    // }, (err) => {
    //     console.log('Unable to count todos', err)
    // })

    var fetchTodo = (obj) => {
        db.collection('Todos').find(obj).toArray().then((docs) => {
            console.log(JSON.stringify(docs,undefined,2))
        }, (err) => {
            console.log('Unable to fetch todos', err)    
        })
    }
    
    fetchTodo()

    //client.close()
})