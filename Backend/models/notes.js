const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        default: 'Untitled Note'
    },
    description: {
        type: String
    },
    text: {
        type: String,
    },
    img: {
        type: String
    }

})

module.exports = mongoose.model('Notes', noteSchema)