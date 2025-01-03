const TelegramBot = require('node-telegram-bot-api');

// Ton token et ID
const bot = new TelegramBot('7546348683:AAECO7ClGJZfYbRnWMbSFUEs6DUuP5At9Hc', { polling: true });
const admin_id = 7728855185;

bot.onText(/\/ban (@\w+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const username = match[1];
  const userId = msg.from.id;

  bot.getChatMember(chatId, userId).then((member) => {
    if (member.status === 'administrator' || member.status === 'creator') {
      bot.getChatMember(chatId, username).then((memberToBan) => {
        bot.kickChatMember(chatId, memberToBan.user.id).then(() => {
          bot.sendMessage(chatId, `✅ L'utilisateur ${username} a été banni.`);
        }).catch(() => {
          bot.sendMessage(chatId, `❌ Impossible de bannir ${username}.`);
        });
      });
    } else {
      bot.sendMessage(chatId, "❌ Vous devez être admin pour utiliser cette commande.");
    }
  });
});
