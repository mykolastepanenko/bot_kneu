const cart = require("./src/cart");
const sendMenu = require("./src/sendMenu");

function logic(bot, message) {
  const chatId = message.chat.id;
  let init_keyboard = [["Меню"], ["Заказать"], ["Поддержка"]];
  let keyboard = [];
  let msg;
  let remove_keyboard = false;
  let inline_keyboard = [
    [
      { text: "Да", callback_data: "true" },
      { text: "Нет", callback_data: "false" },
    ],
  ];
  switch (message.text) {
    case "меню":
      sendMenu(bot, chatId);
      break;
    case "удалить все":
      console.log(cart.length);
      cart.splice(0);
      bot.sendMessage(chatId, "Вы очистили корзину!");
      break;
    default:
      msg = "Простите, я не знаю что вам ответить 😔";
      inline_keyboard = [[]];
  }

  if (message.text === "/start" || message.text === "привет") {
    start();
    return 0;
  }

  if (message.text === "корзина") {
    if (cart.length === 0) {
      bot.sendMessage(chatId, "Ваша корзина пуста");
    } else {
      bot.sendMessage(chatId, "Ваша корзина");
      for (let item of cart) {
        console.log("\nCART NOW");
        console.log(item);
        bot.sendMessage(chatId, item, {
          parse_mode: "html",
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: "удалить", callback_data: `remove_item_${item}` }],
            ],
          }),
        });
      }
    }
    return 0;
  }

  if (
    message.text.match(/пиц/gi) &&
    (message.text.match(/хочу/gi) ||
      message.text.match(/дайте/gi) ||
      message.text.match(/дай/gi) ||
      message.text.match(/мне пожалуйста/gi) ||
      message.text.match(/мне/gi) ||
      message.text.match(/заказ/gi))
  ) {
    sendMenu(bot, chatId);
    return 0;
  }

  bot.sendMessage(chatId, msg, {
    parse_mode: "html",
    reply_markup: JSON.stringify({
      inline_keyboard: inline_keyboard,
    }),
  });

  function start() {
    msg =
      "Привет, меня зовут Mykola's Pizza Bot 😋\nХотите заказать пиццу? Я могу помочь)";
    inline_keyboard = [
      [
        { text: "Да", callback_data: "true" },
        { text: "Нет", callback_data: "false" },
      ],
    ];

    bot.sendMessage(chatId, msg, {
      parse_mode: "html",
      reply_markup: JSON.stringify({
        keyboard: [["/start"], ["меню"], ["корзина"]],
      }),
    });
    setTimeout(() => {
      bot.sendMessage(chatId, "Хотите пиццы?", {
        parse_mode: "html",
        reply_markup: JSON.stringify({
          inline_keyboard: inline_keyboard,
        }),
      });
    }, 3000);
  }
}

module.exports = logic;
