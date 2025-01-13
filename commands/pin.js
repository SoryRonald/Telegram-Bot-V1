
const axios = require('axios');

module.exports = (bot) => {
    bot.command('pin', async (ctx) => {
        const input = ctx.message.text.split(' ').slice(1).join(' ');
        const match = input.match(/(.+)-([0-9]+)/);
        
        if (!match) {
            return ctx.reply('❌ Utilisation incorrecte. Exemple : /pin chat -3 (où -3 est le nombre d'images).');
        }

        const query = match[1].trim();
        const numImages = parseInt(match[2], 10);

        if (!query || isNaN(numImages) || numImages < 1 || numImages > 10) {
            return ctx.reply('❌ Veuillez fournir une requête valide et un nombre entre 1 et 10. Exemple : /pin chat -3');
        }

        try {
            const apiKey = "key_64b5b074f0ae9b3bdca7948619c03572cdbd63f538c98fac0d2b2cd21299f44d3fd2ca56e301a8c98dfecee2cf76f0c550db0dd4f72e687df254e97089a1433f";
            const response = await axios.post(
                'https://api.runwayml.com/v1/generate',
                {
                    prompt: query,
                    num_images: numImages
                },
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const images = response.data.results;
            if (images && images.length > 0) {
                for (const image of images) {
                    await ctx.replyWithPhoto(image.url, { caption: `Image trouvée pour : "${query}"` });
                }
            } else {
                ctx.reply('❌ Aucune image trouvée pour votre requête. Essayez un autre terme.');
            }
        } catch (err) {
            console.error(err.message);
            ctx.reply('❌ Une erreur est survenue lors de la récupération des images. Vérifiez votre requête ou réessayez plus tard.');
        }
    });
};
