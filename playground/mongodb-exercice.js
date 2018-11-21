const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
       return console.log('Unable to connect to Mongo db')
    }
    console.log('connect to Mongo db')
    const db = client.db('TodoApp')

    // //deleteMany
    // db.collection('Todos').deleteMany({text: 'have lunch'}).then((result) => {
    //     console.log(result)
    // },
    // () => {
    // })
    
    // //deleteOne -> delete the first item found
    // db.collection('Todos').deleteOne({text: 'delete me'}).then( (result) => {
    //     console.log(result)
    // })
    
    // //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({text: 'delete me'}).then((result) => {
    //         console.log(result)
    //     }
    // )

    //db.collection('Users').deleteMany({name: 'outro'})

    var searchedID = new ObjectID('5bce6ce78a7771006dc67d85')
    
    db.collection('Users').findOneAndDelete({_id: searchedID}).then((result) => {
        console.log(`Deleted document: ${JSON.stringify(result, undefined, 2)}`)
    }, (err) => {   
        console.log(`Document not find: ${err}`)
    })

    //client.close()
})