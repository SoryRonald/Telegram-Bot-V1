
const axios = require('axios');

module.exports = (bot) => {
    bot.command('lyrics', async (ctx) => {
        const query = ctx.message.text.split(' ').slice(1).join(' ');
        if (!query) {
            return ctx.reply('❌ Veuillez fournir un artiste ou une chanson. Exemple : /lyrics Tiakola Meuda');
        }
        try {
            const { data } = await axios.get(`https://api.lyrics.ovh/v1/${query}`);
            ctx.reply(`🎵 Paroles pour "${query}" :\n${data.lyrics}`);
        } catch (err) {
            ctx.reply('❌ Impossible de trouver les paroles.');
        }
    });
};
