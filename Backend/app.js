const express = require('express');
const app = express();
// const methodOverride = require('method-override')
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/Notes').then(() => console.log("connected to DB")).catch((e) => console.log("Error occoured!! :(", e))
// const ejs = require('ejs')
// const ejsMate = require('ejs-mate')
const session = require('express-session')
// const flash = require('connect-flash')
const notesRouter = require("./controllers/notes")
const userRouter = require('./controllers/user')
// app.set('view engine', 'ejs')
// app.engine('ejs', ejsMate)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
// app.use(methodOverride('_method'))
app.use(session({
    secret: "Jedi"
}))
// app.use(flash())
app.use((req, res, next) => {
    // res.locals.success = req.flash('success')
    // res.locals.error = req.flash('error')
    next();
})

app.get('/', (req, res) => {
    res.json({ 'WELCOME': 'Home Route' })
})

app.use('/user/', userRouter)

app.use('/', notesRouter)

app.listen(3000, () => { console.log('On PORT 3000.....') })