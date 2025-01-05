
module.exports = (bot) => {
    bot.command('out', async (ctx) => {
        const botAdmins = [7728855185]; // Remplace par tes IDs admins
        if (!botAdmins.includes(ctx.from.id)) {
            return ctx.reply('❌ Seuls les administrateurs du bot peuvent utiliser cette commande.');
        }
        if (ctx.chat.type !== 'group' && ctx.chat.type !== 'supergroup') {
            return ctx.reply('❌ Cette commande fonctionne uniquement dans les groupes.');
        }
        try {
            await ctx.leaveChat();
            ctx.reply('✅ Le bot a quitté le groupe.');
        } catch (err) {
            ctx.reply('❌ Impossible de quitter le groupe.');
        }
    });
};
