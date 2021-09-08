function logic(message) {
  let init_keyboard = [["Меню"], ["Заказать"], ["Поддержка"]];
  const res = {
    msg: "",
    keyboad: init_keyboard,
  };
  let msg;
  let remove_keyboard = false;
  switch (message) {
    case "/start":
      res.msg = "Привет, хотите заказать пиццу? 😋";
      res.keyboad = init_keyboard;
      break;
    default:
      res.msg = "Простите, я не знаю что вам ответить 😔";
  }
  return res;
}

module.exports = logic;
