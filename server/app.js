const express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var models = require('./app/models');

const hostname = "0.0.0.0";
const port = 3000;

const app = express();

app.use(cors());

var server = require('http').createServer(app);

const io = require('socket.io')(server);

app.use(bodyParser.json());

// Routes Start

// Get Channels
app.get('/channels', async function (req, res) {

    var error = false;

    await models.Channel.find({}, function (err, channels) {
        if (err) {
            error = true;
            res.status(400).json({message: `Channels.all error: ${error}`});
        } else {
            res.status(200).json({channels: channels});
        }
    });
});

// Create Channel => { name: string }
app.post('/channels', async function (req, res) {
    if (!req.body || !req.body.name) {
        return res.status(400).json({message: "No name provided."});
    }

    const channel = await models.Channel.find({name: req.body.name});

    if (channel.length !== 0) {
        return res.status(400).json({message: "A channel already exist with this name."});
    }

    const newChannel = await models.Channel.create({
        name: req.body.name,
        messages: [],
    });

    if (newChannel.length === 0) {
        return res.status(400).json({message: "Channel not created."});
    }

    res.status(200).json({message: "Channel created.", channel_id: newChannel._id});
});

// Change Channel's name => { name: string }
app.put('/channels/:id', async function (req, res) {
    if (!req.params || !req.params.id) {
        return res.status(400).json({message: "No id provided."});
    }

    if (!req.body || !req.body.name) {
        return res.status(400).json({message: "No name provided."});
    }

    const channel = await models.Channel.findById(req.params.id);

    if (!channel) {
        return res.status(400).json({message: "No Channel with this id."});
    }

    if (channel.name === req.body.name) {
        return res.status(400).json({message: "Channel have already the same name."});
    }

    channel.name = req.body.name;

    const saved = await channel.save();

    if (!saved) {
        return res.status(200).json({message: `Channel not saved.`});
    }
    res.status(200).json({message: "Channel renamed.", channel_id: channel._id});

});

// Channel delete
app.delete('/channels/:id', async function (req, res) {
    if (!req.params || !req.params.id) {
        return res.status(400).json({message: "No id provided."});
    }

    await models.Channel.deleteOne({_id: req.params.id}, function (err) {
        if (err) {
            return res.status(400).json({message: `Delete channel: ${err}.`});
        } else {
            return res.status(200).json({message: `Channel deleted.`});
        }
    });

});

// Get Channel
app.get('/channels/:id', async function (req, res) {
    if (!req.params || !req.params.id) {
        return res.status(400).json({message: "No id provided."});
    }

    const channel = await models.Channel.findById(req.params.id);

    if (!channel) {
        return res.status(400).json({message: "No Channel with this id."});
    }

    res.status(200).json({channel_model: channel});
});

// Enter channel
app.post('/channels/:id/enter_channel', async function (req, res) {
    if (!req.params || !req.params.id) {
        return res.status(400).json({message: "No id provided."});
    }

    if (!req.body || !req.body.userId) {
        return res.status(400).json({message: "No user provided."});
    }

    const user = await models.User.findById(req.body.userId);

    if (!user) {
        return res.status(400).json({message: "User don't exist."});
    }

    if (user.channel) {
        return res.status(400).json({message: "User already in a channel."});
    }

    const channel = await models.Channel.findById(req.params.id);

    if (!channel) {
        return res.status(400).json({message: "No Channel with this id."});
    }

    user.channel = channel._id;

    await user.save();

    channel.messages.push({
        username: undefined,
        message: `${user.name} entered the channel`
    });

    const saved = await channel.save();

    if (!saved) {
        return res.status(400).json({message: "Message not send."});
    }
    io.emit('refresh', { for: 'everyone' });
    return res.status(200).json({message: "User joined the channel."});

});

// Leave channel
app.post('/leave_channel', async function (req, res) {
    if (!req.body || !req.body.userId) {
        return res.status(400).json({message: "No user provided."});
    }

    const user = await models.User.findById(req.body.userId);

    if (!user) {
        return res.status(400).json({message: "User don't exist."});
    }

    if (!user.channel) {
        return res.status(400).json({message: "User not in a channel."});
    }

    const channel = await models.Channel.findById(user.channel);

    if (channel) {
        channel.messages.push({
            username: undefined,
            message: `${user.name} leaved the channel`
        });

        const saved = await channel.save();

        if (!saved) {
            return res.status(400).json({message: "Message not send."});
        }
    }

    user.channel = undefined;
    await user.save();
    io.emit('refresh', { for: 'everyone' });
    return res.status(200).json({message: "User leave the channel."});

});

// Send message
app.post('/channels/:id/send_message', async function (req, res) {
    if (!req.params || !req.params.id) {
        return res.status(400).json({message: "No id provided."});
    }

    if (!req.body || !req.body.userId) {
        return res.status(400).json({message: "No userId provided."});
    }

    if (!req.body.message) {
        return res.status(400).json({message: "No message provided."});
    }

    const user = await models.User.findById(req.body.userId);

    if (!user) {
        return res.status(400).json({message: "User don't exist."});
    }

    if (!user.channel) {
        return res.status(400).json({message: "User not in a channel."});
    }

    const channel = await models.Channel.findById(req.params.id);

    if (!channel) {
        return res.status(400).json({message: "No Channel with this id."});
    }

    if (!user.channel._id.equals(channel._id)) {
        return res.status(400).json({message: "User not in this channel."});
    }

    channel.messages.push({
        username: user.name,
        message: req.body.message
    });

    const saved = await channel.save();

    if (!saved) {
        return res.status(400).json({message: "Message not send."});
    }
    io.emit('refresh', { for: 'everyone' });
    return res.status(200).json({message: "Message send."});

});

// Connexion
app.post('/register', async function (req, res) {
    if (!req.body || !req.body.name) {
        return res.status(400).json({message: "No name provided."});
    }

    const old_user = await models.User.find({name: req.body.name});

    if (old_user.length !== 0) {
        return res.status(400).json({message: "A User already exist with this name."});
    }

    const user = await models.User.create({
        name: req.body.name,
        channel: undefined,
    });

    if (!user) {
        return res.status(400).json({message: "User not created."});
    }
    return res.status(200).json({message: "User created.", user_model: user});
});

app.get('/getMe/:id', async function (req, res) {
    if (!req.params || !req.params.id) {
        return res.status(400).json({message: "No id provided."});
    }

    const user = await models.User.findById(req.params.id);

    if (!user) {
        return res.status(400).json({message: "No user found."});
    }
    return res.status(200).json({message: "User found.", user_model: user});
});


// Routes End

io.on('connection', function(socket){
    console.log('a user connected');
});

const connectDb = () => {
    return mongoose.connect("mongodb://mongo:27017/irc-mongodb-server", {useNewUrlParser: true});
};

connectDb().then(async () => {
    server.listen(port, hostname, function () {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
});

module.exports = io;
