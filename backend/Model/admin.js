const mongoose = require('mongoose')

module.exports = mongoose.model('Admin', {
    Name: {type: String},
    Password: {type: String},
    Email: {type: String}
})