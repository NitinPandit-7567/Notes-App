const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: String,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notes'
    }]
})

userSchema.statics.findAndValidate = async function (username, password) {
    const u = await this.findOne({ username });
    if (u) {
        const result = bcrypt.compare(password, u.password)
        if (result) {
            return u
        }
    }
    return false
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

module.exports = mongoose.model('Users', userSchema);