const axios = require('axios');

// API Key de Runway
const API_KEY = 'key_64b5b074f0ae9b3bdca7948619c03572cdbd63f538c98fac0d2b2cd21299f44d3fd2ca56e301a8c98dfecee2cf76f0c550db0dd4f72e687df254e97089a1433f';

// Commande Generate
module.exports = (bot) => {
  bot.onText(/\/generate (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const prompt = match[1]; // Texte de l'utilisateur

    bot.sendMessage(chatId, `🔄 Génération d'une image pour : "${prompt}"...`);

    try {
      // Envoi de la requête à Runway
      const response = await axios.post(
        'https://api.runwayml.com/v1/models/text-to-image/run',
        {
          prompt: prompt, // Texte pour générer l'image
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // URL de l'image générée
      const imageUrl = response.data.output;

      // Envoi de l'image générée à l'utilisateur
      bot.sendPhoto(chatId, imageUrl, { caption: `Voici l'image générée pour : "${prompt}"` });
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, `❌ Une erreur s'est produite lors de la génération de l'image.`);
    }
  });
};
