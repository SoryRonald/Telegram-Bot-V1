
const axios = require('axios');

module.exports = (bot) => {
    bot.command('generate', async (ctx) => {
        const prompt = ctx.message.text.split(' ').slice(1).join(' ');
        if (!prompt) {
            return ctx.reply('❌ Veuillez fournir une description. Exemple : /generate chat');
        }
        try {
            ctx.reply(`🔄 Génération d'une image pour : "${prompt}"...`);
            const { data } = await axios.post('https://api.runwayml.com/v1/some-endpoint', { prompt });
            ctx.replyWithPhoto(data.image_url);
        } catch (err) {
            ctx.reply('❌ Erreur lors de la génération de l'image.');
        }
    });
};
