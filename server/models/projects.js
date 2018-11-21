var mongoose = require('mongoose')

var Project = mongoose.model('Project',{
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    collaborator: {
        type: String,
        required: true,
        minlength: 1       
    }
})

module.exports = {Project}