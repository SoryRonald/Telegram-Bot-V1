module.exports = (bot) => {
  bot.command('ban', async (ctx) => {
    if (ctx.chat.type !== 'group' && ctx.chat.type !== 'supergroup') {
      return ctx.reply("❌ Cette commande est uniquement disponible dans les groupes.");
    }

    const admins = await ctx.getChatAdministrators();
    const isAdmin = admins.some((admin) => admin.user.id === ctx.from.id);

    if (!isAdmin) {
      return ctx.reply("🚫 Seuls les administrateurs peuvent bannir des membres.");
    }

    if (!ctx.message.reply_to_message) {
      return ctx.reply("❌ Vous devez répondre au message d'un utilisateur pour le bannir.");
    }

    try {
      await ctx.kickChatMember(ctx.message.reply_to_message.from.id);
      ctx.reply(`🔨 L'utilisateur ${ctx.message.reply_to_message.from.first_name} a été banni.`);
    } catch (error) {
      console.error('Erreur dans la commande /ban :', error.message);
      ctx.reply('❌ Une erreur est survenue. Assurez-vous que le bot est administrateur.');
    }
  });
};
