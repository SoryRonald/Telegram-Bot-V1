
module.exports = (bot) => {
    bot.command('notification', (ctx) => {
        const botAdmins = [7728855185]; // Remplace par tes IDs admins
        if (!botAdmins.includes(ctx.from.id)) {
            return ctx.reply('❌ Seuls les administrateurs peuvent utiliser cette commande.');
        }
        const message = ctx.message.text.split(' ').slice(1).join(' ');
        if (!message) {
            return ctx.reply('❌ Veuillez fournir un message de notification. Exemple : /notification Salut tout le monde !');
        }
        try {
            ctx.telegram.sendMessage(ctx.chat.id, `📢 Notification : ${message}`);
        } catch (err) {
            ctx.reply('❌ Impossible d'envoyer la notification.');
        }
    });
};
