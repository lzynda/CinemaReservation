require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const reservationsRouter = require('./routes/reservations')
app.use('/reservations', reservationsRouter)

const moviesRouter = require('./routes/movies')
app.use('/movies', moviesRouter)


const usersRouter = require('./routes/users')
app.use('/users', usersRouter)


app.listen(3000, () => console.log('Server Started'))

