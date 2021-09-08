require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const logic = require("./logic");
const menu = require("./src/menu");
const token = process.env.BOT_ID;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  bot.sendMessage(chatId, resp);
});

bot.on("message", (message) => {
  const chatId = message.chat.id;
  let res = logic(message.text);
  bot.sendMessage(chatId, res.msg, {
    reply_markup: {
      keyboard: res.keyboad,
      // remove_keyboard: true,
    },
  });
  console.log(message);
  console.log(res);
});
