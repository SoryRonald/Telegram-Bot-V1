module.exports = (bot) => {
  const botAdmins = [7728855185]; // Liste des administrateurs du bot

  bot.command('out', async (ctx) => {
    try {
      // Vérifier si la commande est utilisée dans un groupe
      if (ctx.chat.type !== 'group' && ctx.chat.type !== 'supergroup') {
        return ctx.reply('❌ Cette commande ne peut être utilisée que dans un groupe.');
      }

      // Vérifier si l'utilisateur est admin du bot
      if (!botAdmins.includes(ctx.from.id)) {
        return ctx.reply('❌ Seuls les administrateurs du bot peuvent utiliser cette commande.');
      }

      // Quitter le groupe
      await ctx.reply('👋 Au revoir, je quitte le groupe.');
      await bot.telegram.leaveChat(ctx.chat.id);
    } catch (error) {
      console.error('Erreur dans la commande /out :', error.message);
      ctx.reply('❌ Une erreur est survenue. Le bot n\'a pas pu quitter le groupe.');
    }
  });
};
