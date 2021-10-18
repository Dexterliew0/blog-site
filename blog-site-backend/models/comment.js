const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user' },
    post: { type: Schema.Types.ObjectId, ref: 'post' },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('comment', commentSchema);