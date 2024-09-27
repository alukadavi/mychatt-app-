const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Fetch messages for the logged-in user
router.get('/', async (req, res) => {
    const userId = req.user.id; // Assuming you have user authentication
    const messages = await Message.find({ receiver: userId }).populate('sender');
    res.json(messages);
});

// Send a new message
router.post('/', async (req, res) => {
    const { message, receiver } = req.body;
    const sender = req.user.id; // Assuming you have user authentication

    const newMessage = new Message({
        message,
        sender,
        receiver,
    });

    await newMessage.save();
    res.json(newMessage);
});

module.exports = router;
