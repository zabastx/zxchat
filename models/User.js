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
    contacts: [{ type: Types.ObjectId, ref: 'User' }]
})

module.exports = model('User', schema)