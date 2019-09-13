var mongoose = require('mongoose');

const Message = {
    username: String,
    message: String,
};

const channelSchema = new mongoose.Schema({

    name: String,
    messages: [Message]
});

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;
