module.exports = bot => {
  bot.onText(/\/join/, async (msg) => {
    const chatId = msg.reply_to_message.chat.id;
    bot.unbanChatMember(chatId, msg.from.id); // Supposons que l'utilisateur soit temporairement banni.
  });
};
