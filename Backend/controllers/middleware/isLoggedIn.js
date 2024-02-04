const express = require('express');
const jwt = require('jsonwebtoken')
const tokenSecret = 'Jedi'
const Users = require('../../models/user')
module.exports = async function (req, res, next) {
    // const authToken = req.headers.authorization.split(' ')[1];
    const authToken = req.headers.authorization;
    try {
        const result = jwt.verify(JSON.parse(authToken), tokenSecret)
        console.log(result)
        const user = await Users.findById(result.user_id)
        if (user) {
            req.session.user_id = user._id
            return next()
        }
    }
    catch {
        res.send({ error: 'You must be signed in' })
    }
}

