const menu = require("./menu");
const sendMenu = require("./sendMenu");
const cart = require("./cart");

function callbackData(bot, callback) {
  const data = callback.data;
  switch (callback.data) {
    case "true":
      bot.sendMessage(callback.from.id, `Отлично!`);
      sendMenu(bot, callback.from.id);
      break;
    case "false":
      bot.sendMessage(
        callback.from.id,
        `Акция! При покупке второй пиццы вы получаете скидку 25% 😜`,
        {
          parse_mode: "html",
          reply_markup: JSON.stringify({
            inline_keyboard: [[{ text: "Заказать", callback_data: "true" }]],
          }),
        }
      );
      break;
  }

  for (let item of menu) {
    if (data === item.name) {
      console.log(item.name);
      cart.push(item.name);
      console.log("\n\nКорзина");
      console.log(cart);
      bot.sendMessage(
        callback.from.id,
        `Вы добавили в корзину <b>${data}</b>`,
        {
          parse_mode: "html",
        }
      );
    }
  }

  for (let item of cart) {
    if (data.includes("remove") && item.includes(item)) {
      if (data === `remove_item_${item}`) {
        let index = cart.indexOf(item);
        cart.splice(index, 1);
        bot.sendMessage(
          callback.from.id,
          `Вы удалили <b>${item}</b> из корзины`,
          {
            parse_mode: "html",
          }
        );
      }
    }
  }
}

module.exports = callbackData;
