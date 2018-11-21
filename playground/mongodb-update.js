const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
       return console.log('Unable to connect to Mongo db')
    }
    console.log('connect to Mongo db')
    const db = client.db('TodoApp')

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5bce3b899812d31220d53e6e')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(JSON.stringify(result))
    // })

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5bce6cb98a7771006dc67d70')
    }, {
        $set: {
            name: 'Roberto'
        },
        $inc: {age: 1}
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(`New object: ${JSON.stringify(result)}`)
    })


    //client.close()
})