const botAdmins = [7728855185];
let allUsers = [];

module.exports = (bot) => {
  bot.use(async (ctx, next) => {
    if (ctx.from) {
      const user = {
        id: ctx.from.id,
        first_name: ctx.from.first_name,
        username: ctx.from.username || "Pas de pseudo",
      };

      if (!allUsers.some((u) => u.id === user.id)) {
        allUsers.push(user);
      }
    }
    await next();
  });

  bot.command('users', async (ctx) => {
    try {
      if (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup') {
        const members = await ctx.getChatMembersCount();
        ctx.reply(`📋 Le groupe contient ${members} membres.`);
      } else if (ctx.chat.type === 'private') {
        if (!botAdmins.includes(ctx.from.id)) {
          return ctx.reply("🚫 Seuls les administrateurs du bot peuvent utiliser cette commande en privé.");
        }

        const userList = allUsers.map((user) => {
          return `👤 ${user.first_name} (${user.username})`;
        });

        ctx.reply(`📋 Utilisateurs interagissant avec le bot :\n\n${userList.join('\n')}`);
      }
    } catch (error) {
      console.error('Erreur dans la commande /users :', error.message);
      ctx.reply('❌ Une erreur est survenue.');
    }
  });
};
