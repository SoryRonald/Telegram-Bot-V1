const TelegramBot = require('node-telegram-bot-api');

// Ton token et ID
const bot = new TelegramBot('7546348683:AAECO7ClGJZfYbRnWMbSFUEs6DUuP5At9Hc', { polling: true });
const admin_id = 7728855185;

bot.on('new_chat_members', (msg) => {
  const chatTitle = msg.chat.title || 'un chat inconnu';
  bot.sendMessage(admin_id, `📢 Le bot a été ajouté au groupe : "${chatTitle}".`);
});
