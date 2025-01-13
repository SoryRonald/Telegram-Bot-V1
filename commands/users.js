
const users = new Set();

module.exports = (bot) => {
    bot.on('message', (ctx) => {
        users.add(ctx.from.id);
    });

    bot.command('users', (ctx) => {
        const botAdmins = [7728855185]; // Remplace par tes IDs admins
        if (!botAdmins.includes(ctx.from.id)) {
            return ctx.reply('❌ Seuls les administrateurs du bot peuvent utiliser cette commande.');
        }
        if (ctx.chat.type === 'private') {
            ctx.reply(`📜 Utilisateurs ayant interagi avec le bot :\n${[...users].join('\n')}`);
        } else {
            ctx.reply(`📜 Membres du groupe :\n${ctx.chat.members_count}`);
        }
    });
};
