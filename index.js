const telegrambot = require("node-telegram-bot-api");
const axios = require("axios");
require("dotenv").config();

const bot = new telegrambot(process.env.BOT_TOKEN, { polling: true});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "welcome type help to see commands");
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "available commands:\n/start - start bot\n/help\n/ - Show list")
  
});

bot.onText(/\/query (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const query = match[1];

  try {
    const response = await axios.get(`https://api.samirzyx.repl.co/api/gpt?query=${encodeURIComponent(query)}`);
    const ans = response.data.resultText;
    bot.sendMessage(chatId, ans);
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, "an error occurred");
    
  }
});

//