require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const User = require('./models/User')
const Message = require('./models/Message')
const app = express()
const { createServer } = require('http')
const httpServer = createServer(app)
const { Server } = require('socket.io')
const uuid = require('uuid')
const mongo = require('./mongo')
const { join, resolve } = require('path')
const siofu = require("socketio-file-upload")

const io = new Server(httpServer)

io.engine.generateId = req => { return uuid.v4() }

const usersOnline = {}

io.on('connection', async socket => {
    console.log('Socket connected\n')
    socket.on('register', async ({ username, password }, callback) => {
        const reg = await mongo.register({ username, password })
        if (reg.error) return console.log(reg.error)
        const res = await mongo.login({ username, password })
        usersOnline[res.user._id] = socket.id
        if (res.user) delete res.user.password
        callback(res)
        io.emit('UPDATE_ONLINE', Object.keys(usersOnline))
    })
    socket.on('login', async ({ username, password, token }, callback) => {
        let res
        if (token) res = await mongo.verify(token)
        if (username) res = await mongo.login({ username, password })
        if (res.success) usersOnline[res.user._id] = socket.id
        if (res.user) delete res.user.password
        callback(res)
        io.emit('UPDATE_ONLINE', Object.keys(usersOnline))
    })
    socket.on('logout', () => {
        const key = Object.keys(usersOnline).find(key => usersOnline[key] === socket.id)
        delete usersOnline[key]
        io.emit('UPDATE_ONLINE', Object.keys(usersOnline))
    })
    socket.on('userSearch', async (req, callback) => {
        const regex = new RegExp(req, 'i')
        const users = await User.find({ username: { $regex: regex } })
        const search = users.map(user => {
            delete user.password
			return user
        })
        callback(search)
    })
    socket.on('privateMsg', async ({ receiver, message, sender }) => {
        const msg = await mongo.sendMessage({ message, receiver, sender })
        io.to(usersOnline[receiver]).emit('addMessage', msg)
        socket.emit('addMessage', msg)
    })
    socket.on('getMessages', async (user, chat) => {
        const messages = await mongo.getMessages(user, chat)
        socket.emit('SET_MESSAGES', messages)
    })
    socket.on('addContact', async (req, callback) => {
        const user = await User.findOne({ _id: req.user }).populate('contacts')
        user.contacts.push(req.selected)
        await user.save()
        callback(await User.findOne({ _id: req.user }).populate('contacts'))
    }),
    socket.on('delContact', async (req, callback) => {
        const user = await User.findOne({ _id: req.user }).populate('contacts')
        const idx = user.contacts.findIndex(item => item._id.toString() === req.selected)
        user.contacts.splice(idx, 1)
        await user.save()
        callback(await User.findOne({ _id: req.user }).populate('contacts'))
    })
    socket.on('disconnect', () => {
        const key = Object.keys(usersOnline).find(key => usersOnline[key] === socket.id)
        delete usersOnline[key]
        io.emit('UPDATE_ONLINE', Object.keys(usersOnline))
    }),
    socket.on('updateProfile', async (req, callback) => {
        console.log('update prof', req)
        const user = await User.findOne({ _id: req.id }).populate('contacts')
        user.bio = req.bio
        await user.save()
        callback(user)
    })
})

app.use('/', express.static(join(__dirname, 'dist'))).use(siofu.router)
app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'dist', 'index.html'))
})


async function start() {
    mongoose.connect(process.env.MONGOURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    httpServer.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
}

start()