const express = require("express")
const router = express.Router({ mergeParams: true });
const Notes = require('../models/notes')
const Users = require('../models/user')
const isLoggedIn = require('./middleware/isLoggedIn')
const wrapAsync = require('../utils/wrapAsync')
const AppError = require('../utils/AppError')
router.route('/new')
    .post(isLoggedIn, wrapAsync(async (req, res) => {
        const { title, description, text, img } = req.body
        const user_id = req.session.user_id
        const note = new Notes({ title, description, text, img })
        if (note) {
            const user = await Users.findById(user_id)
            if (user) {
                user.notes.push(note)
                await user.save()
                await note.save()
                console.log(note)
                res.send({ status: 'success', id: note._id })
            }
        }
        else {
            res.send({ status: 'error' })
        }
    }))
router.route('/mynotes')
    .get(isLoggedIn, wrapAsync(async (req, res, next) => {
        console.log("HEEREE")
        const user_id = req.session.user_id
        const user = await Users.findById(user_id).populate('notes')
        if (user) {
            console.log(user)
            res.send({ notes: user.notes, status: 'Success' })
        }
    }))
router.route('/view/:id')
    .get(isLoggedIn, wrapAsync(async (req, res, next) => {
        console.log('route hit')
        const user_id = req.session.user_id;
        const { id } = req.params;
        const user = await Users.findById(user_id).populate('notes')
        if (user) {
            const note = user.notes.filter((el) => { if (el._id.toString() === id) { console.log(el); return el } })
            if (note) {
                console.log(note)
                res.send({ note: note[0], success: true })
            }
        }
        else {
            throw new AppError(404, 'Not Found :(')
        }
    }))
    .delete(isLoggedIn, wrapAsync(async (req, res, next) => {
        const user_id = req.session.user_id;
        const { id } = req.params;
        const user = await Users.findByIdAndUpdate(user_id, { $pull: { notes: id } }, { new: true })
        console.log('In Delete: ', user)
        if (user) {
            const note = await Notes.findByIdAndDelete(id)
            res.send({ success: 'true', user: user, note: note })
        }
        else {
            throw new AppError(404, 'Not Found :(')
        }
    }))
    .patch(isLoggedIn, wrapAsync(async (req, res, next) => {
        const { id } = req.params;
        console.log(req.body);
        const user_id = req.session.user_id;
        const { title, description, text, img } = req.body;
        const user = await Users.findById(user_id);
        if (user) {
            let check = false;
            for (let i of user.notes) {
                if (i.toString() === id) {
                    check = true
                }
            }
            if (check) {
                const note = await Notes.findByIdAndUpdate(id, { title, description, text, img })
                res.send({ success: true })
            }
            else {
                res.send({ success: false, error: 404, message: "Not Found" })
            }
        }
        else {
            res.send({ success: false, error: 404, message: "Not Found" })
        }
    }))
module.exports = router;