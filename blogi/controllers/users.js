const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)

usersRouter.post('/', async (request, response, next) => {
    try{
        const body = request.body

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })

        const savedUser = await user.save()

        response.json(savedUser)
    }   catch (exception) {
        if(exception.name === 'ValidationError'){
            return response.status(400).json({ error: exception.message})
        }
        next(exception)
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users.map(User.format))
})

module.exports = usersRouter