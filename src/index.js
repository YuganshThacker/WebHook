require('dotenv').config(); // Load .env file first
const TelegramBot = require('node-telegram-bot-api'); // Import Telegram Bot API

const token = process.env.TOKEN; // Fetch token from environment variables
if (!token) {
    throw new Error('TOKEN is not defined in the .env file');
}

const bot = new TelegramBot(token, { polling: true }); // Initialize the bot

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Received your message'); // Acknowledge messages
});
