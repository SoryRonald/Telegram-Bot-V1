const axios = require('axios');

module.exports = bot => {
  bot.onText(/\/lyrics (.+)/, async (msg, match) => {
    const query = match[1];
    const chatId = msg.chat.id;

    try {
      const response = await axios.get(`https://api.lyrics.ovh/v1/${query}`);
      bot.sendMessage(chatId, `Paroles pour ${query} :\n\n${response.data.lyrics}`);
    } catch {
      bot.sendMessage(chatId, "Impossible de trouver les paroles.");
    }
  });
};
