const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    sender: { type: Types.ObjectId, ref: 'User' },
    receiver: { type: Types.ObjectId, ref: 'User' },
})

module.exports = model('Message', schema)