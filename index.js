const { Telegraf } = require('telegraf');
const fs = require('fs');
const express = require('express');
const path = require('path');
const axios = require('axios');

// Lecture du token à partir du fichier account.dev.txt
const tokenPath = path.resolve(__dirname, 'account.dev.txt');
const token = fs.readFileSync(tokenPath, 'utf-8').trim();

if (!token) {
    throw new Error('Token not found. Please ensure account.dev.txt contains your bot token.');
}

const bot = new Telegraf(token);
const app = express();

const PORT = process.env.PORT || 3000;
const URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;

require('./commands/ai')(bot);
require('./commands/admin')(bot);
require('./commands/help')(bot);
require('./commands/translate')(bot);
require('./commands/start')(bot);
require('./commands/imgbb')(bot);
require('./commands/getid')(bot);

// Commande générique pour répondre aux questions
bot.on('text', async (ctx) => {
    const prompt = ctx.message.text;
    const senderId = ctx.from.id;

    try {
        const { data: { response } } = await axios.get(`https://kaiz-apis.gleeze.com/api/gpt-4o?q=${encodeURIComponent(prompt)}&uid=${ctx.from.id}`); // thank you kaiz

        const parts = [];
        for (let i = 0; i < response.length; i += 1999) {
            parts.push(response.substring(i, i + 1999));
        }

        for (const part of parts) {
            await ctx.reply(part);
        }
    } catch (error) {
        ctx.reply('Une erreur est survenue lors de la génération de la réponse. Veuillez réessayer plus tard.');
        console.error('Erreur lors de l\'appel à l\'API GPT-4o:', error.message);
    }
});

// Configuration du webhook Telegram
bot.telegram.setWebhook(`${URL}/bot${token}`);
app.use(bot.webhookCallback(`/bot${token}`));

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Bot lancé avec succès sur : ${URL}`);
});
