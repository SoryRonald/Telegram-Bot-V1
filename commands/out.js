const TelegramBot = require('node-telegram-bot-api');

// Ton token et ID
const bot = new TelegramBot('7546348683:AAECO7ClGJZfYbRnWMbSFUEs6DUuP5At9Hc', { polling: true });
const ADMIN_ID = 7728855185;

bot.onText(/\/out/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (userId === ADMIN_ID) {
    bot.sendMessage(chatId, "👋 Le bot quitte le groupe.").then(() => {
      bot.leaveChat(chatId);
    });
  } else {
    bot.sendMessage(chatId, "❌ Seul l'administrateur du bot peut utiliser cette commande.");
  }
});
