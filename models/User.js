const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contacts: [{ type: Types.ObjectId, ref: 'User' }],
    bio: String,
    userPic: String
})

module.exports = model('User', schema)