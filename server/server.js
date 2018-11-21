const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

const {mongoose} = require('./db/mongoose.js')
const {Todo} = require('./models/todo.js')
const {User} = require('./models/user.js')
const {Project} = require('./models/projects.js')

var app = express()

//process.env.PORT is going to be set if the app is running on Heroku, 3000 if local
const port = process.env.PORT || 3000

app.use(bodyParser.json())


app.get('/', (req,res) => {
     res.status(200).send('Hello Brother')
})


app.post('/todos', (req,res) => {
    console.log(req.body)
    var todo = new Todo({
        text: req.body.text
    })

    todo.save().then((doc) => {
        console.log('Todo sucessfully saved. ', doc)
        res.send(doc) //let the user know the id and anything that were not defined by the user
    }, (err) => {
        console.log('Error while trying to save todo. ', err)
        res.status(400).send(err)
    })

})

app.get('/todos', (req,res) => {
    Todo.find().then((todos) => {   
        res.send({todos,
        code: 'test'})
    }, (e) => { 
        res.status(400).send(e)
    })
})

// :variable -> url parameter, the id variable will be on the request object
app.get('/todos/:id', (req,res) => {
    if(!ObjectID.isValid(req.params.id)){
        res.status(404).send()
    } else {
        Todo.findById(req.params.id).then((todo) => {
            if(!todo){
                res.status(404).send()
            } else { 
                res.status(200).send({todo})
            }
        }).catch((e) => {
            res.status(400).send() //we dont send the error because it could contain private information
        })
    }
})

app.delete('/todos/:id', (req,res) => {
    var id = req.params.id
    if(!ObjectID.isValid(id)){
        res.status(404).send()
    } else {
        Todo.findByIdAndDelete(id).then((todo) => {
            if(!todo){
                res.status(404).send()
            } else { 
                res.status(200).send({todo})
            }
        }).catch((e) => {
            res.status(400).send() //we dont send the error because it could contain private information
        })
    }
})

app.patch('/todos/:id', (req,res) => {
    var id = req.params.id
    var body = _.pick(req.body, ['text','completed']) 

    if(!ObjectID.isValid(id)){
        res.status(404).send()
    } 

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime()
    } else {
        body.completed = false
        body.completedAt = null
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo){
            return res.status(404).send()
        }

        res.send({todo})
    }).catch((e) => {
        res.status(400).send()
    })

})

app.listen(port, () => {
    console.log(`Started up at port ${port}`)
})

module.exports = {app}