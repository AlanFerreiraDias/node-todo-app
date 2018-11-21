const {ObjectID} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')

var id = "6bd12489af3f741f34a1861c"

if(!ObjectID.isValid(id)){
    console.log('ID not valid')
}

//When it finds one, it returns an Array with one element
Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos)
})

//When it finds one, it returns the object
Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo: ', todo)
})

//Faster
Todo.findById(id).then((todo) => {
    console.log('Todo by Id: ', todo)
}).catch((e) => {
    console.log('Error', e)
})

