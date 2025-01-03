const botAdmins = [7728855185]; // Liste des administrateurs du bot

module.exports = (bot) => {
  bot.on('new_chat_members', async (ctx) => {
    const newMembers = ctx.message.new_chat_members;
    const botMember = newMembers.find((member) => member.id === ctx.botInfo.id);

    if (botMember) {
      const addedBy = ctx.from.first_name || 'Un utilisateur inconnu';

      // Notification pour chaque admin du bot
      botAdmins.forEach((adminId) => {
        bot.telegram.sendMessage(
          adminId,
          `🚨 Le bot a été ajouté dans un nouveau groupe !\n\n📋 **Groupe** : ${ctx.chat.title}\n👤 **Ajouté par** : ${addedBy} (${ctx.from.id})\n\nID du groupe : ${ctx.chat.id}`,
          { parse_mode: 'Markdown' }
        );
      });
    }
  });
};
