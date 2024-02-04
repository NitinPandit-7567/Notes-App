const express = require('express')
const router = express.Router({ mergeParams: true });
const Joi = require('joi')
const userSchema = require('../Schema/userSchema')
const Users = require('../models/user')
const jwt = require('jsonwebtoken')
const tokenSecret = 'Jedi'
const isLoggedIn = require('./middleware/isLoggedIn')
const wrapAsync = require('../utils/wrapAsync')
router.route('/sign-up')
    .post(wrapAsync(async (req, res, next) => {
        console.log('Incoming transmission')
        const validation = userSchema.validate(req.body)
        if (!validation.error) {
            const user = new Users(validation.value)
            await user.save()
            const authToken = jwt.sign({ user_id: user._id }, tokenSecret, { expiresIn: '1h' })
            req.session.user_id = user._id
            validation.authToken = authToken
            console.log(user)
        }
        console.log(validation)
        res.send(validation)
    }))
router.route('/login')
    .post(wrapAsync(async (req, res) => {
        console.log('Incoming transmission')
        const { username, password } = req.body
        console.log(req.body)
        const user = await Users.findAndValidate(username, password)
        if (user) {
            const authToken = jwt.sign({ user_id: user._id }, tokenSecret, { expiresIn: '1h' })
            res.send({ login: true, authToken: authToken })
        }
        else {
            res.send({ login: false, error: { status: 404, message: 'Incorrect UserId/Password' } })
        }
    }))
router.route('/logout')
    .get(isLoggedIn, async (req, res) => {
        req.session.user_id = null
        res.send({ login: false })
    })
module.exports = router;