const express = require('express')
const router = express.Router({ mergeParams: true });
router.route('/sign-up')
    .get((req, res) => {
        res.send('Signup Form')
    })
    .post(async (req, res) => {
        res.send('Successfully created user')
    })
router.route('/login')
    .get((req, res) => {
        res.send('Login Form')
    })
    .post(async (req, res) => {
        res.send('Successfully logged in!')
    })

module.exports = router;