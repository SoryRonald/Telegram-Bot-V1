
module.exports = (bot) => {
    bot.command('join', async (ctx) => {
        const botAdmins = [7728855185]; // Remplace par tes IDs admins
        if (!botAdmins.includes(ctx.from.id)) {
            return ctx.reply('❌ Seuls les administrateurs du bot peuvent utiliser cette commande.');
        }
        const groupId = ctx.message.reply_to_message.text.split(':')[1]?.trim();
        if (!groupId) {
            return ctx.reply('❌ Répondez au message de notification avec le groupId pour utiliser cette commande.');
        }
        try {
            await bot.telegram.joinChat(groupId);
            ctx.reply('✅ Le bot a rejoint le groupe avec succès.');
        } catch (err) {
            ctx.reply('❌ Impossible de rejoindre le groupe.');
        }
    });
};
