const TelegramBot = require('node-telegram-bot-api');

// Ton token et ID
const bot = new TelegramBot('7546348683:AAECO7ClGJZfYbRnWMbSFUEs6DUuP5At9Hc', { polling: true });
const admin_id= 7728855185;

bot.onText(/\/notification (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const message = match[1];

  if (userId === ADMIN_ID) {
    bot.sendMessage(chatId, `📢 Notification : ${message}`);
  } else {
    bot.sendMessage(chatId, "❌ Seul l'administrateur peut utiliser cette commande.");
  }
});
