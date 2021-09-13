const menu = require("./menu");

function sendMenu(bot, chatId) {
  bot.sendMessage(chatId, `У нас в меню есть ${menu.length} пиццы!`);
  for (let item of menu) {
    bot.sendMessage(
      chatId,
      `<b>Название</b>: ${item.name}
<b>Цена</b>: ${item.price}
<b>Вес</b>: ${item.weight}`,
      {
        parse_mode: "html",
        reply_markup: JSON.stringify({
          inline_keyboard: [[{ text: "Заказать", callback_data: item.name }]],
        }),
      }
    );
  }
}

module.exports = sendMenu;
