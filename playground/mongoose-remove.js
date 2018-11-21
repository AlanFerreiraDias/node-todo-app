const {ObjectID} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')

// Todo.remove({}).then((result) => {
//     console.log(result)
// })

// Todo.findOneAndRemove({_id: 'ObjectID'}}) //returns the object that was removed, uses an query Object
Todo.findByIdAndRemove(new ObjectID('5bd26d3228949a00153cb59c')).then((todo) => {
    console.log(`removed todo: ${JSON.stringify(todo, undefined,2)}`)
}) 