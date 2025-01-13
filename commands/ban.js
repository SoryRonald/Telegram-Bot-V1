
module.exports = (bot) => {
    bot.command('ban', async (ctx) => {
        const botAdmins = [7728855185]; // Remplace par tes IDs admins
        if (!ctx.message.reply_to_message) {
            return ctx.reply('❌ Répondez à un message pour bannir un utilisateur.');
        }
        const userToBan = ctx.message.reply_to_message.from.id;
        if (!ctx.chat) {
            return ctx.reply('❌ Cette commande fonctionne uniquement dans les groupes.');
        }
        try {
            await ctx.banChatMember(userToBan);
            ctx.reply('✅ Utilisateur banni avec succès.');
        } catch (err) {
            ctx.reply('❌ Impossible de bannir cet utilisateur.');
        }
    });
};
