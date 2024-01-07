const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true

    },
    admin: {
        type: Boolean,
        requred: true,
        default: false
    }
})

module.exports = mongoose.model('User', userSchema)