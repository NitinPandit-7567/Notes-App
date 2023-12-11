const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    note: {
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
    }
})

const Notes = mongoose.model('Notes', noteSchema)