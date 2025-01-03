 module.exports = {
    log: message => console.log(`[LOG] ${message}`),
    error: message => console.error(`[ERREUR] ${message}`),
};

const { Telegraf } = require('telegraf');
const fs = require('fs');
const express = require('express');
const path = require('path');
const axios = require('axios');

const tokenPath = path.resolve(__dirname, 'account.dev.txt');
const token = fs.readFileSync(tokenPath, 'utf-8').trim();

if (!token) {
    throw new Error('Token not found. Please ensure account.dev.txt contains your bot token.');
}

const bot = new Telegraf(token);
const app = express();

const PORT = process.env.PORT || 3000;
const URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

require('./commands/ai')(bot);
require('./commands/admin')(bot);
require('./commands/help')(bot);
require('./commands/translate')(bot);
require('./commands/start')(bot);
require('./commands/imgbb')(bot);
require('./commands/getid')(bot);
require('./commands/notify')(bot)
require('./commands/ban')(bot)
require('./commands/users')(bot)
require('./commands/out')(bot)
require('./commands/generate')(bot)
require('./commands/spotify')(bot)
require('./commands/lyrics')(bot)
require('./commands/video')(bot)
require('./commands/join')(bot)
require('./commands/notification')(bot)


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

bot.telegram.setWebhook(`${URL}/bot${token}`);
app.use(bot.webhookCallback(`/bot${token}`));

app.listen(PORT, () => {
    console.log(`
0%   ▒▒▒▒▒▒▒▒▒▒
10%  █▒▒▒▒▒▒▒▒▒
20%  ██▒▒▒▒▒▒▒▒
30%  ███▒▒▒▒▒▒▒
40%  ████▒▒▒▒▒▒
50%  █████▒▒▒▒▒
60%  ██████▒▒▒▒
70%  ███████▒▒▒
80%  ████████▒▒
90%  █████████▒
100% ██████████
✅ Made by RONALD SORY ホ 
✅ Bot lancé avec succès sur : ${URL}`);
});
