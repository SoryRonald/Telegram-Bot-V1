const youtubedl = require('youtube-dl-exec');

module.exports = bot => {
  bot.onText(/\/video (.+)/, async (msg, match) => {
    const query = match[1];
    const chatId = msg.chat.id;

    try {
      const videoFile = `${query}.mp4`;
      await youtubedl(`ytsearch:${query}`, { output: videoFile });
      bot.sendVideo(chatId, videoFile);
    } catch {
      bot.sendMessage(chatId, "Impossible de trouver la vidéo.");
    }
  });
};
