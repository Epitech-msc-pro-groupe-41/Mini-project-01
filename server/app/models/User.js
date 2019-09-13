var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel'}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
