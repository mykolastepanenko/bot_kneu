require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const logic = require("./logic");
const menu = require("./src/menu");
const token = process.env.BOT_ID;
const callbackData = require("./src/callback");

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  bot.sendMessage(chatId, resp);
});

bot.on("message", (message) => {
  logic(bot, message);
});

bot.on("callback_query", (update)=>{
  callbackData(bot, update)
});
