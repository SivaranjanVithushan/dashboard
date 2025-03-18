const mongoose = require('mongoose')

module.exports = mongoose.model('Student', {
    Name: {type: String},
    Image: {type: String},
    Age: {type: String},
    Status: {type: String,default:"Active"},
})