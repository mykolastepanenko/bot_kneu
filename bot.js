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
    parse_mode: "html",
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          { text: "1", callback_data: "it's a callback" },
          { text: "2", callback_data: "it's a callback" },
        ],
        [
          { text: "3", callback_data: "it's a callback" },
          { text: "4", callback_data: "it's a callback" },
        ],
      ],
    }),
  });
  // console.log(message);
  // console.log(res);
});

bot.on("callback_query", (update) => {
  console.log(update.data);
  bot.sendMessage(update.from.id, "Вы нажали на кнопку :)");
});
