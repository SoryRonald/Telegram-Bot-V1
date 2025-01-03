const TelegramBot = require('node-telegram-bot-api');
const youtubedl = require('youtube-dl-exec');

// Token du bot Telegram
const TELEGRAM_TOKEN = '7546348683:AAECO7ClGJZfYbRnWMbSFUEs6DUuP5At9Hc';

// Configurer le bot Telegram
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// Commande pour /spotify (ou /music)
bot.onText(/\/spotify (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const query = match[1];

  try {
    // Télécharger l'audio depuis YouTube
    const youtubeSearch = `${query}`;
    const audioFile = `${query}.mp3`;

    await youtubedl(`ytsearch:${youtubeSearch}`, {
      output: audioFile,
      extractAudio: true,
      audioFormat: 'mp3',
    });

    // Envoyer l'audio sur Telegram
    bot.sendAudio(chatId, audioFile, { title: query });
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, "Erreur lors du téléchargement de la chanson.");
  }
});
