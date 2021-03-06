const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user' },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('post', postSchema);