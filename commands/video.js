const axios = require('axios');

module.exports = (bot) => {
    bot.command('video', async (ctx) => {
        const query = ctx.message.text.split(' ').slice(1).join(' ');
        if (!query) {
            return ctx.reply('❌ Veuillez fournir un terme de recherche. Exemple : /video Naruto');
        }

        try {
            const response = await axios.get('https://www.youtube.com/results', {
                params: { search_query: query },
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });

            const videoIdMatch = response.data.match(/"videoId":"(\\w{11})"/);
            if (videoIdMatch && videoIdMatch[1]) {
                const videoUrl = `https://www.youtube.com/watch?v=${videoIdMatch[1]}`;
                ctx.reply(`🎥 Vidéo trouvée pour "${query}" :\n${videoUrl}`);
            } else {
                ctx.reply('❌ Aucune vidéo trouvée. Essayez un autre terme.');
            }
        } catch (err) {
            console.error(err.message);
            ctx.reply('❌ Une erreur est survenue lors de la recherche. Réessayez plus tard.');
        }
    });
};