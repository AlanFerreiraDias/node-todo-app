const expect = require('expect')
const request = require('supertest')

const {app} = require('./../server') // .. "volta" um diretório
const {Todo} = require('./../models/todo')
const {ObjectID} = require('mongodb')

const todos = [{
    _id: new ObjectID(), 
    text: 'First todo'
}, {
    _id: new ObjectID(), 
    text: 'second todo'
}, {
    _id: new ObjectID(), 
    text: 'third todo'
}]

beforeEach((done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos)
        .then(() => done())
    })
})

describe('POST /todos', () => {

    it('should create a new todo', (done) => {
        var text = 'Test todo task'
        
        request(app)
            .post('/todos')
            .send({text}) //used to pass data with the request. text:text -> {text}
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                if(err){
                    done(err)
                }
                else{
                    Todo.find({text}).then((todos) => {
                        expect(todos.length).toBe(1)
                        expect(todos[0].text).text
                        done()
                    }).catch((e) => done(e))
                }
            })
    }) 

    it('should not creat todo with invalid data', (done)=> {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res) => {
                if(err){
                    return done(err)
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3)
                    done()
                }).catch((e) => done(e))
            })  
    })

})

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .end((err,res) => {
                if(err){
                    return done(err)
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3)
                    done()
                })
            })
    })  
})  

describe('GET /todos/ :id', () => {
    it('should get todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done)
    })

    it('should return a 404 for non-object ids', (done) => {
        //todos/123
        request(app)
        .get(`/todos/${'abc123'}`)
        .expect(404)
        .end(done)
    })

    it('should return a 404 if todo not found', (done) => {
        //make sure you get a 404 back
        request(app)
        .get(`/todos/${new ObjectID().toHexString()}`)
        .expect(404)
        .end(done)
    })

})


 describe('DELETE /todos/ :id', () => {
    it('should DELETE todo doc', (done) => {
        var id = todos[0]._id.toHexString()
        request(app)
            .delete(`/todos/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end((err, res) => {
                if(err) {
                    return done(err)
                } else {
                    
                    Todo.findById(id).then((todo) => {
                            expect(todo).not.toBeTruthy()
                            done()
                        }).catch((e) => {
                        done(e)
                    })

                }
            })
    })

     it('should return a 404 for non-object ids', (done) => {
         //todos/123
         request(app)
            .delete(`/todos/${'abc123'}`)
            .expect(404)
            .end(done)
        })

    it('should return a 404 if todo not found', (done) => {
        //make sure you get a 404 back
        request(app)
        .delete(`/todos/${new ObjectID().toHexString()}`)
        .expect(404)
        .end(done)
    })
  
})