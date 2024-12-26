const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Your Telegram Bot token and group chat ID
const botToken = process.env.TOKEN;
const groupId = process.env.GROUP_ID;

// Webhook endpoint to receive messages
app.post('/webhook', async (req, res) => {
  const message = req.body.message || 'No message received';

  try {
    // Send the message to the Telegram group
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    await axios.post(url, {
      chat_id: groupId,
      text: message,
    });

    console.log(`Message sent to group: ${message}`);
    res.sendStatus(200); // Acknowledge successful handling
  } catch (error) {
    console.error('Error sending message to Telegram:', error.message);
    res.sendStatus(500);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
