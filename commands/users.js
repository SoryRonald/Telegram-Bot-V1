const TelegramBot = require('node-telegram-bot-api');

// Ton token et ID
const bot = new TelegramBot('7546348683:AAECO7ClGJZfYbRnWMbSFUEs6DUuP5At9Hc', { polling: true });
const admin_id= 7728855185;

const users = new Set();

bot.on('message', (msg) => {
  users.add(msg.from.username || `ID:${msg.from.id}`);
});

bot.onText(/\/users/, (msg) => {
  const userId = msg.from.id;
  const chatId = msg.chat.id;

  if (userId === admin_id) {
    bot.sendMessage(chatId, `👥 Utilisateurs ayant interagi avec le bot :\n${[...users].join('\n')}`);
  } else {
    bot.sendMessage(chatId, "❌ Cette commande est réservée à l'administrateur.");
  }
});
