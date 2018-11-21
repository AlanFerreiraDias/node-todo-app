var mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || 'mongodb://todo_app:!JAVALImanobrista123@ds221292.mlab.com:21292/todo_app_alan_dias' || 'mongodb://localhost:27017/TodoApp')

module.exports = {mongoose}