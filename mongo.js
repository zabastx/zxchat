require('dotenv').config()
const bcrypt = require('bcryptjs')
const User = require('./models/User')
const Message = require('./models/Message')
const jwt = require('jsonwebtoken')
const sanitize = require('mongo-sanitize')
const { AES, enc } = require('crypto-js')

async function verify(token) {
	try {
		const { userId } = await jwt.verify(token, process.env.JWTS)
		const user = await User.findById(userId).populate('contacts')

		return { token, user, success: true }
	} catch (err) {
		console.log('error in auth/verify\n', err.message)
		return { success: false, error: err.message }
	}
}

async function register({ username, password }) {
	try {
		const san_username = sanitize(username.toLowerCase())
		const san_password = sanitize(password)

		const candidate = await User.findOne({ username: san_username })

		if (candidate) {
			return { success: false, message: 'Такой пользователь уже зарегистрирован' }
		}

		const hashedPass = await bcrypt.hash(san_password, 12)

		const user = new User({ username: san_username, password: hashedPass })
		await user.save()

		return { success: true, message: 'Аккаунт зарегистрирован'}
	} catch (err) {
		console.log('Error in register\n', err.message)
		return { success: false, error: err.message }
	}
}

async function login({ username, password }) {
	try {
		const san_username = sanitize(username.toLowerCase())
		const san_password = sanitize(password)
		
		const user = await User.findOne({ username: san_username }).populate('contacts')

		if (!user) return { success: false, message: 'Пользователь не найден' }

		const isMatch = await bcrypt.compare(san_password, user.password)

		if (!isMatch) return { success: false, message: 'Неверный пароль' }

		const token = jwt.sign({ userId: user.id }, process.env.JWTS, { expiresIn: '4h' })
		return { token, user: user._doc, success: true }
	} catch (err) {
		console.log('Error in login\n', err)
		return { success: false, error: err.message }
	}
}

async function sendMessage({ message, sender, receiver }) {
	try {
		const encrytedMsg = AES.encrypt(message, process.env.CRYPTO)
		const newMessage = new Message({
			content: encrytedMsg,
			sender,
			receiver
		})
		await newMessage.save()
		newMessage.content = decryptMsg(encrytedMsg)
		return newMessage
	} catch (err) {
		console.log('error in sendMessage\n', err.message)
	}
}

async function getMessages(user, chat) {
	const messages = await Message.find()
    .or([{ sender: user, receiver: chat }, { receiver: user, sender: chat }]).sort({ _id: -1 }).limit(25).lean()
	messages.forEach(item => item.content = decryptMsg(item.content))
	return { [chat]: messages }
}

function decryptMsg(msg) {
	return AES.decrypt(msg, process.env.CRYPTO).toString(enc.Utf8)
}

module.exports = { register, login, verify, sendMessage, getMessages }